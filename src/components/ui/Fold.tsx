"use client";
import React, { useEffect, useState } from "react";
import Folder from "~/components/ui/Folder";
import { useFolder } from "~/components/ui/FolderContext";
import Group from "~/components/ui/Group";

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

  // Function to add a new folder
  const addFolder = async () => {
    try {
      const newFolderName = `${folderName} ${folders.length + 1}`;
      const newFolderId = folders.length + 1;
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
    <div className="items-left justify-left flex w-full flex-col gap-2">
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
      <div className="flex w-full overflow-x-auto font-serif">
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
