import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";
import { tasks } from "~/server/db/schema";

// Define the expected structure of the request data
interface TaskData {
  task: string;
  date: string;
  month: string;
  year: string;
}

// Cache user tasks for a short duration (optional)
// const TASK_CACHE_DURATION = 60 * 50; //
export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }


    const currentDate = new Date()
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const mon = currentMonth + 1

    console.log('uid:', { userId, currentYear, mon })

    const todos = await db
    .select({ task: tasks.task, date: tasks.date }) // selecting only necessary columns
    .from(tasks)
    .where(
      and(
        eq(tasks.userId, userId),
        eq(tasks.year, String(currentYear)), // Match tasks.year with currentYear
        eq(tasks.month, String(mon)) // Match tasks.month with mon
      )
    );
  
    console.log("todos", todos);
    // Cache-Control headers (optional)
    const response = NextResponse.json(todos);
    // response.headers.set("Cache-Control", `max-age=${TASK_CACHE_DURATION}`);
    return response;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Parse and validate JSON only once
  let taskData: TaskData;
  try {
    taskData = await request.json() as TaskData;
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  // Check if task and date are provided
  if (!taskData.task || !taskData.date) {
    return new NextResponse("Missing task or date", { status: 400 });
  }

  // Insert the new task into the database
  const [todo] = await db
    .insert(tasks)
    .values({
      userId,
      task: taskData.task,
      date: taskData.date,
      month: taskData.month,
      year: '2024'
    })
    .returning({ task: tasks.task, date: tasks.date }); // Return only necessary fields

  return NextResponse.json(todo);
}
