import { openai } from "@/config/OpenAiModel"
import { db } from "@/config/db";
import { SessionChatTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const REPORT_GEN_PROMPT = `You are an AI therapist Voice Agent that just finished a voice conversation with a user. Based on therapist agent information and Conversation between AI Therapist and User, generate a structured report with the following fields:

1, sessionId: a unique session identifier
2, agent; the therapist specialist name(e.g., "War Trauma Therapist AI")
3, user: name of the patient or "Anonymous" if not provided
4, timestamp: current date and time in ISO format
5, chiefComplaint: one-sentence summary of the main trauma concern
6, sumarry: a 2-3 sentence of the conversation, triggers and recommendations
7, triggers: list of triggers mentioned by the user
8, duration: how long the user has experienced the trauma
9, severity: ,mild, moderate or severe
10, medicationsMentioned: list of any medication mentioned
11, recommendations: list of AI suggestions(e.g., rest, see a therapist)
Return the result in this JSON format:
{

	"sessionId":"string",
	"agent":"string",
	"user":"string",
	"timestamp":"ISO Date string",
	"chiefComplaint": "string",
	"summary": "string",
	"triggers": ["trigger1","trigger2"],
	"duration": "string",
	"severity": "string",
	"medicationsMentioned": ["med1","med2"],
	"recommendations": ["rec1","rec2"],
}
Only include valid fields. Respond with nothing else.
`;

export async function POST(req: NextRequest) {
  const { messages, sessionDetail, sessionId } = await req.json();

  try {
  
    const userInput = "AI Therapist Agent Info:"+JSON.stringify(sessionDetail)+", Conversation:"+JSON.stringify(messages);
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        { role: "system", content: REPORT_GEN_PROMPT },
        { role: "user", content: userInput },
      ],
    });

    const rawResp = completion.choices[0].message;
    // Clean response
    const Resp = rawResp?.content?.trim().replace('```json', '').replace(/```/g, '');
    const JSONResp = JSON.parse(Resp || '{}');

    // Save to database
    const result = await db.update(SessionChatTable).set({
        report: JSONResp,
        conversation: messages,
      })
      .where(eq(SessionChatTable.sessionId, sessionId));

    return NextResponse.json(JSONResp);
  } catch (e) {
    return NextResponse.json(e);
  }
}
