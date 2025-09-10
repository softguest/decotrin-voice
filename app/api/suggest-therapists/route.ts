// import { openai } from "@/config/OpenAiModel"
// import { AITherapistList } from "@/shared/list";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
// 	const { notes } = await req.json();
// 	try {
// 		const completion = await openai.chat.completions.create({
// 			model: "google/gemini-2.0-flash-001",
// 			messages: [
// 				{ role: 'system', content: JSON.stringify(AITherapistList)},
// 				{ role: "user", content: "User Notes/Symptoms:" + notes + ", Depending on user notes and symptoms, Please suggest list of therapists. Return objects in JSON only "}
// 			]
// 		});

// 		const rawResp = completion.choices[0].message;

// 		//@ts-ignore
// 		const Resp = rawResp.content.trim('```json','').replace('```','')
// 		const JSONResp = JSON.parse(Resp);

// 		return NextResponse.json(JSONResp);
	
// 	} catch (e) {
// 		return NextResponse.json(e);
// 	}
// }

import { openai } from "@/config/OpenAiModel"
import { AITherapistList } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { notes } = await req.json();
  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        { role: "system", content: JSON.stringify(AITherapistList) },
        {
          role: "user",
          content:
            "User Notes/Symptoms: " +
            notes +
            ". Depending on user notes and symptoms, suggest a list of therapists. Return objects in pure JSON only, no text.",
        },
      ],
    });

    // some SDKs return .content as array
    const rawContent = completion.choices[0].message?.content;

    // handle array case
    const text =
      Array.isArray(rawContent) && rawContent.length > 0
        ? rawContent[0].text
        : (rawContent as string);

    // clean up backticks if present
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return NextResponse.json(parsed);
  } catch (e: any) {
    console.error("Suggest therapist error:", e);
    return NextResponse.json(
      { error: e.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
