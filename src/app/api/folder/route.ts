
import { db } from '~/server/db';
import { folders } from '~/server/db/schema';
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextResponse } from 'next/server';
// import { metadata } from '~/app/layout';

export async function GET() {
    const { userId } = auth();

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const userFolders = await db.select()
        .from(folders)
        .where(and(
            eq(folders.userId, userId)
            
        ));

    // If no folders exist, create a default folder
    if (userFolders.length === 0) {
        const defaultFolder = await db.insert(folders).values({
            userId,
            folderId:1,
            folderName: "Folder"
        }).returning();
        return NextResponse.json(defaultFolder);
    }

    return NextResponse.json(userFolders);
}

export async function POST(request: Request) {
    interface FolderData {
        folderName: string;
        folderId: number;
    }

    const { userId } = auth();

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { folderName,folderId }: FolderData = await request.json() as FolderData;



    const newFolder = await db.insert(folders).values({
        userId,
        folderId,
        folderName
    }).returning();

    return NextResponse.json(newFolder);
}

