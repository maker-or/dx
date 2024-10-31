import { createUploadthing, type FileRouter } from "uploadthing/next";
import { db } from "~/server/db";
import { getAuth } from "@clerk/nextjs/server";
import { posts } from "~/server/db/schema";



const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ pdf: { maxFileSize: "4MB", maxFileCount: 40 } })
    .middleware(async ({ req }) => {
      // Use Clerk's getAuth function to authenticate the user
      const { userId } = getAuth(req);

      // If user is not authenticated, throw an error
      if (!userId) throw new Error("Unauthorized");

      // Get the current URL from the request
      const url = new URL(req.url, `http://${req.headers.get('host')}`);
      console.log("url", url);
      
      // Extract the last character from the pathname
      const lastChar = url.pathname.slice(-1);
      console.log("lastChar", lastChar);


      
      // Convert to number if possible, otherwise default to 1
      const folderId = lastChar && !isNaN(Number(lastChar)) ? Number(lastChar) : 1;

      // Pass both userId and folderId to onUploadComplete
      return { userId, folderId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      console.log("folder id:", metadata.folderId);

      // Insert uploaded file details into the database
      await db.insert(posts).values({
        name: file.name,
        url: file.url,
        userId: metadata.userId,
        folderId: metadata.folderId, // Use the extracted folderId
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return { uploadedBy: metadata.userId, folderId: metadata.folderId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;