// import { openai } from "@/config/OpenAiModel"
// import { db } from '@/config/db';
// import { SessionChatTable } from '@/config/schema';
// import { eq } from "drizzle-orm";
// import { NextRequest, NextResponse } from 'next/server';

// export { NextRequest } from 'next/server';

// const REPORT_GEN_PROMPT=`You are a compassionate and understanding therapist. Your goal is to provide emotional support, coping strategies, and therapeutic guidance to help users navigate their feelings and challenges.`

// export async function POST(req:NextRequest) {
//     const { messages, sessionDetail, sessionId } = await req.json();

//     try{
//         const UserInput = "AI Therapist Agent Info"+JSON.stringify(sessionDetail)+", Conversation:"+JSON.stringify(messages);
//         const completion = await openai.chat.completions.create({
//         model: "google/gemini-2.0-flash-001",
//         messages: [
//             {role: "system", content: REPORT_GEN_PROMPT},
//             {role: "system", content: UserInput},
//         ],
//     });

//     const rawResp = completion.choices[0].message;

//     //@ts-ignore
//     const Resp = rawResp?.content.trim().replace('```json','').replace(/```/g,'');
//     const JSONResp = JSON.parse(rawResp); 

//     // Save to Database 
//     const result = await db.update(SessionChatTable).set({
//         report: JSONResp,
//         conversation:messages
//     }).where(eq(SessionChatTable.sessionId,sessionId))

//     return NextResponse.json(JSONResp);

//     } catch(e){
//         return NextResponse.json(e);
//     }
// }

import { openai } from "@/config/OpenAiModel"
import { db } from "@/config/db";
import { SessionChatTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const REPORT_GEN_PROMPT = `
You are a compassionate and understanding therapist.
Your goal is to provide emotional support, coping strategies, and therapeutic guidance
to help users navigate their feelings and challenges.
Return the report as JSON only.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages, sessionDetail, sessionId } = await req.json();

    const userInput = `
AI Therapist Agent Info: ${JSON.stringify(sessionDetail)}
Conversation: ${JSON.stringify(messages)}
`;

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        { role: "system", content: REPORT_GEN_PROMPT },
        { role: "user", content: userInput },
      ],
    });

    const rawResp = completion.choices[0]?.message?.content;

    if (!rawResp) {
      return NextResponse.json(
        { error: "No response from model" },
        { status: 500 }
      );
    }

    // Clean response
    const cleanedResp = rawResp
      .trim()
      .replace("```json", "")
      .replace(/```/g, "");

    let JSONResp;
    try {
      JSONResp = JSON.parse(cleanedResp);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse model response", raw: cleanedResp },
        { status: 500 }
      );
    }

    // Save to database
    await db
      .update(SessionChatTable)
      .set({
        report: JSONResp, // or JSON.stringify(JSONResp) depending on schema
        conversation: messages,
      })
      .where(eq(SessionChatTable.sessionId, sessionId));

    return NextResponse.json(JSONResp);
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
