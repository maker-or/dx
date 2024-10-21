import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { auth } from "@clerk/nextjs/server";
import { tasks } from "~/server/db/schema";
import { eq } from "drizzle-orm";

interface TaskData {
  id: string;
  task: string;
  date: string;
}

export async function PATCH(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Assert the expected structure of the request body
  const { id, task, date }: TaskData = await request.json() as TaskData;

  // Update the task in the database
  const updatedTask = await db
    .update(tasks)
    .set({ task, date })
    .where(eq(tasks.taskId, parseInt(id, 10)))
    .returning();

  return NextResponse.json(updatedTask);
}
