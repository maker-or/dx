import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";

export default async function getMyImages() {
  try {
    const { userId } = auth();
    if (!userId) return null; // or return [] if you prefer an empty array

    const images = await db.query.posts.findMany({
      where: (model, { eq }) => eq(model.userId, userId),
      orderBy: (model, { desc }) => desc(model.id),
    });

    return images;
  } catch (error) {
    console.error("Error fetching images:", error);
    return null; // or return [] if you prefer an empty array
  }
}