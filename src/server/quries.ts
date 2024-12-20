
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";


export default async function getMyImages(folderId: number) {
  try {
    const { userId } = auth();

    // const id =100;
    if (!userId) return null; 

    const images = await db.query.posts.findMany({
      where: (model, { eq, and }) => and(
        eq(model.userId, userId),
         eq(model.folderId, folderId) 
      ),
      orderBy: (model, { desc }) => desc(model.id),
    });
    
    return images;
  } catch (error) {
    console.error("Error fetching images:", error);
    return null; 
  }
}