'use client'; 
import Folder from "~/components/ui/Folder";
import { useFolder } from '~/components/ui/FolderContext';

export default function HomePage() {
  const { folderName } = useFolder(); // Access the folder name from context

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8 bg-[#0c0c0c]">
      <Folder folderName={folderName} />
    </main>
  );
}
