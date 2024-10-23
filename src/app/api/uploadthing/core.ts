import { createUploadthing, type FileRouter } from "uploadthing/next";
import { db } from "~/server/db";
import { getAuth } from "@clerk/nextjs/server"; // Clerk server-side authentication
import { posts } from "~/server/db/schema"; // Adjust this to your table if needed

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ pdf: { maxFileSize: "4MB", maxFileCount: 40 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // Use Clerk's getAuth function to authenticate the user
      const { userId } = getAuth(req);

      // If user is not authenticated, throw an error
      if (!userId) throw new Error("Unauthorized");

      // Pass the userId to onUploadComplete as metadata
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      // Insert uploaded file details into the database
      await db.insert(posts).values({
        name: file.name,
        url: file.url,
        userId: metadata.userId, // Use the Clerk userId from metadata
        folderId: 1, // Assuming a default folderId for simplicity
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Return metadata for the client-side callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
