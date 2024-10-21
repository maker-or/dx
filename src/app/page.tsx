'use client';
import CalendarTimeline from "~/components/ui/CalendarTimeline";
import Folder from "../components/ui/Folder";
import { useFolder } from '../components/ui/FolderContext';
import Group from "~/components/ui/Group";
import { useState } from "react";

export default function HomePage() {
  const { folderName } = useFolder(); // Access the folder name from context

  // Initial state for displayBlocks
  const [displayBlocks, setDisplayBlocks] = useState([
    { name: folderName } // Use folderName from context for initial folder
  ]);

  // Function to add a new block/folder
  const addBlock = () => {
    const newBlockName = `${folderName} ${displayBlocks.length + 1}`; // Name new folders incrementally
    setDisplayBlocks([...displayBlocks, { name: newBlockName }]); // Add a new folder
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8 bg-[#0c0c0c]">
      <div className="flex flex-col items-left justify-left w-full gap-4">
        <Group />
        <div id="addNew" className="flex justify-between items-center w-full">
          <h2 className="font-semibold text-xl text-white">Notebooks</h2>
          <button
            className="px-3 py-1 rounded-lg bg-orange-600 text-white text-md"
            onClick={addBlock} // Call addBlock to add a new folder
          >
            +
          </button>
        </div>
        <div className="flex flex-wrap w-full">
          {/* Render folders dynamically */}
          {displayBlocks.map((item, index) => (
            <Folder folderName={item.name} key={index} />
          ))}
        </div>
      </div>
      <CalendarTimeline />
    </main>
  );
}
