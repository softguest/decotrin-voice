// // 

// import { db } from "@/config/db";
// import { SessionChatTable } from "@/config/schema";
// import { NextRequest, NextResponse } from "next/server";
// import { currentUser } from "@clerk/nextjs/server";
// import { v4 as uuidv4 } from "uuid";
// import { desc, eq } from "drizzle-orm";

// function serialize<T>(row: T): any {
//   return JSON.parse(JSON.stringify(row, (_, value) =>
//     typeof value === "bigint"
//       ? value.toString()
//       : value instanceof Date
//       ? value.toISOString()
//       : value
//   ));
// }

// export async function POST(req: NextRequest) {
//   const { notes, selectedTherapist } = await req.json();
//   const user = await currentUser();
//   try {
//     const sessionId = uuidv4();
//     const result = await db
//       .insert(SessionChatTable)
//       //@ts-ignore
//       .values({
//         sessionId,
//         createdBy: user?.primaryEmailAddress?.emailAddress!,
//         notes,
//         selectedTherapist,
//         createdOn: new Date(), // keep Date type
//       })
//       .returning(); // return inserted row(s)

//     return NextResponse.json({
//       message: "Session Created Successfully",
//       data: serialize(result),
//     });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { message: "Error creating session" },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const sessionId = searchParams.get("sessionId");
//   const user = await currentUser();

//   if (sessionId === "all") {
//     const result = await db
//       .select()
//       .from(SessionChatTable)
//       //@ts-ignore
//       .where(eq(SessionChatTable.createdBy, user?.primaryEmailAddress?.emailAddress))
//       .orderBy(desc(SessionChatTable.id));

//     return NextResponse.json(serialize(result));
//   } else {
//     const result = await db
//       .select()
//       .from(SessionChatTable)
//       //@ts-ignore
//       .where(eq(SessionChatTable.sessionId, sessionId));

//     return NextResponse.json(serialize(result));
//   }
// }


import { db } from "@/config/db";
import { SessionChatTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from "uuid";
import { desc, eq } from "drizzle-orm";

// 🔹 Helper: safely serialize DB rows with bigint/Date
function serialize<T>(row: T): any {
  return JSON.parse(
    JSON.stringify(row, (_, value) =>
      typeof value === "bigint"
        ? value.toString()
        : value instanceof Date
        ? value.toISOString()
        : value
    )
  );
}

// 🔹 Create a new session
export async function POST(req: NextRequest) {
  const { notes, selectedTherapist } = await req.json();
  const user = await currentUser();

  try {
    const sessionId = uuidv4();
    const result = await db
      .insert(SessionChatTable)
      //@ts-ignore
      .values({
        sessionId,
        createdBy: user?.primaryEmailAddress?.emailAddress!,
        notes,
        selectedTherapist,
        createdOn: new Date(),
      })
      .returning();

    return NextResponse.json({
      message: "Session Created Successfully",
      data: serialize(result[0]), // return single session
    });
  } catch (err) {
    console.error("POST /session-chat error:", err);
    return NextResponse.json(
      { message: "Error creating session" },
      { status: 500 }
    );
  }
}

// 🔹 Get sessions
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");
  const user = await currentUser();

  try {
    if (sessionId === "all") {
      const result = await db
        .select()
        .from(SessionChatTable)
        //@ts-ignore
        .where(eq(SessionChatTable?.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(SessionChatTable.id));

      return NextResponse.json(serialize(result)); // array of sessions
    } else {
      const result = await db
        .select()
        .from(SessionChatTable)
        //@ts-ignore
        .where(eq(SessionChatTable?.sessionId, sessionId));

      return NextResponse.json(serialize(result[0] ?? null)); // single session or null
    }
  } catch (err) {
    console.error("GET /session-chat error:", err);
    return NextResponse.json(
      { message: "Error fetching sessions" },
      { status: 500 }
    );
  }
}
