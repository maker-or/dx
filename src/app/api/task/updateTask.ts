// pages/api/tasks/create.ts
import { type NextApiRequest, type NextApiResponse } from 'next';
import { db } from "~/server/db";
import { getAuth } from "@clerk/nextjs/server"; // Clerk server-side authentication
import { tasks } from "~/server/db/schema";

export default async function createTask(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { userId } = getAuth(req);
    // const { date, text } = req.body;

    if (!date || !text) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const { userId } = getAuth(req);

    // Insert the new task into the database
    const newTask = await db.insert(tasks).values({
      task: {task},
      date: {date},
      userId: metadata.userId,, // Use the Clerk userId from metadata
    });

    return res.status(201).json(newTask);  // Respond with the created task
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
