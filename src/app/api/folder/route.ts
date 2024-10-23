
import { db } from '~/server/db';
import { folders } from '~/server/db/schema';
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from 'next/server';

export async function GET() {
    const { userId } = auth();
  
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  
    const userFolders = await db.select().from(folders).where(eq(folders.userId, userId));
    
    // If no folders exist, create a default folder
    if (userFolders.length === 0) {
        const defaultFolder = await db.insert(folders).values({
            userId,
            folderName: "Default Folder"
        }).returning();
        return NextResponse.json(defaultFolder);
    }
  
    return NextResponse.json(userFolders);
}

export async function POST(request: Request) {
    interface FolderData {
        folderName: string;
    }
  
    const { userId } = auth();
  
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  
    const { folderName }: FolderData = await request.json() as FolderData;
  
    const newFolder = await db.insert(folders).values({
        userId,
        folderName
    }).returning();
  
    return NextResponse.json(newFolder);
}