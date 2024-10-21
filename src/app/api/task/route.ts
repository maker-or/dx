import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { tasks } from "~/server/db/schema";




export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const todos = await db.select().from(tasks).where(eq(tasks.userId, userId));

  return NextResponse.json(todos);
}


export async function POST(request: Request) {
  // Define the expected structure of the request data
  interface TaskData {
    task: string;
    date: string;
  }

  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Explicitly type the result of request.json() to avoid the 'any' type
  const { task, date }: TaskData = await request.json() as TaskData;

  // Insert the new task into the database
  const todo = await db.insert(tasks).values({
    userId: userId,
    task: task,  
    date: date,  
  });

  // Return the created todo item as a response
  return NextResponse.json(todo);
}
