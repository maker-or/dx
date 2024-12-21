"use client";
import React, { useEffect, useState } from "react";
import Folder from "~/components/ui/Folder";
import { useFolder } from "~/components/ui/FolderContext";
import Group from "~/components/ui/Group";
import { v4 as uuidv4 } from "uuid";

interface FolderType {
  folderId: number;
  id: string;
  userId: string;
  folderName: string;
}

const Fold = () => {
  const { folderName } = useFolder();
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch folders on component mount
  const fetchFolders = async () => {
    try {
      const response = await fetch("/api/folder");
      if (!response.ok) throw new Error("Failed to fetch folders");
      const data = (await response.json()) as FolderType[];
      setFolders(data);
    } catch (error) {
      console.error("Error fetching folders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchFolders();
  }, []);

  const generateId = () => {
    const id = uuidv4();
    console.log("id:", id);
    const a = id.split("-").join("");
    console.log("generatedId:", a);
    console.log("dafesgrdthyfkugi", a);

    let hash = 0;
    for (let i = 0; i < a.length; i++) {
      hash = (hash << 5) - hash + a.charCodeAt(i); // Bitwise hash
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  };
  // const ans=generateId()
  // Function to add a new folder
  const addFolder = async () => {
    try {
      const ans = generateId();
      const newFolderName = `${folderName} ${folders.length + 1}`;
      const newFolderId = ans;
      const response = await fetch("/api/folder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          folderName: newFolderName,
          folderId: newFolderId,
        }),
      });

      if (!response.ok) throw new Error("Failed to create folder");
      const newFolder = (await response.json()) as FolderType;

      // Update the local state with the new folder from the database
      setFolders((prevFolders) => [...prevFolders, newFolder]);
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  if (isLoading) {
    return <div className="font-serif">Loading...</div>;
  }

  return (
    <div className="items-left justify-left flex w-full flex-col gap-1">
      <Group />
      <div id="addNew" className="flex w-full items-center justify-between">
        <h2 className="font-serif text-xl text-white">Notebooks</h2>
        <button
          className="text-md rounded-lg bg-orange-600 px-3 py-1 text-white"
          onClick={addFolder}
        >
          +
        </button>
      </div>
      <div className="-ml-12 flex w-full overflow-x-auto font-serif md:ml-0 md:pl-12">
        {folders.map((folder) => (
          <Folder
            key={folder.id}
            folderName={folder.folderName}
            folderId={folder.folderId} // Add this line
          />
        ))}
      </div>
    </div>
  );
};

export default Fold;
