import {db} from "@/config/db";
// Update the import to match the actual export name from "@/config/schema"
import { SessionChatTable } from "@/config/schema";
import {NextRequest,NextResponse} from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";

export async function POST(req:NextRequest){
    const {notes,selectTherapist} = await req.json();
    const user = await currentUser();
    try{
    const sessionId = uuidv4();
    const result = await db.insert(SessionChatTable).values({
        sessionId: sessionId,
        userId: user?.primaryEmailAddress?.emailAddress!,
        notes: notes,
        therapistId: selectTherapist,
        createdAt: (new Date()).toISOString(),
    }).returning();
    return NextResponse.json({message: "Session Created Successfully",data:result});
    }catch(err){
        console.log(err);
        return NextResponse.json({message: "Error creating session"}, {status: 500});
    }
}

export async function GET(req:NextRequest){
    const {searchParams} = new URL(req.url);
    const sessionId = searchParams.get("sessionId");
    const user = await currentUser();

    const result = await db.select().from(SessionChatTable).
    //@ts-ignore
    where(SessionChatTable.sessionId.eq(sessionId!));
    try{
        const result = await db.select().from(SessionChatTable)
        //@ts-ignore
        .where(eq(SessionsChatTable.sessionId,sessionId));

        return NextResponse.json(result[0]);
    } catch(err) {
        console.log(err);
        return NextResponse.json({message: "Error fetching session"}, {status: 500});
    }
}