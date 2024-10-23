import React, { useEffect, useState } from 'react';
import Folder from '~/components/ui/Folder';
import { useFolder } from '~/components/ui/FolderContext';
import Group from '~/components/ui/Group';

interface FolderType {
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
            const response = await fetch('/api/folder');
            if (!response.ok) throw new Error('Failed to fetch folders');
            const data = await response.json() as FolderType[];
            setFolders(data);
        } catch (error) {
            console.error('Error fetching folders:', error);
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
            const response = await fetch('/api/folder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ folderName: newFolderName }),
            });

            if (!response.ok) throw new Error('Failed to create folder');
            const newFolder = await response.json() as FolderType;
            
            // Update the local state with the new folder from the database
            setFolders(prevFolders => [...prevFolders, newFolder]);
        } catch (error) {
            console.error('Error creating folder:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-left justify-left w-full gap-4">
            <Group />
            <div id="addNew" className="flex justify-between items-center w-full">
                <h2 className="font-semibold text-xl text-white">Notebooks</h2>
                <button
                    className="px-3 py-1 rounded-lg bg-orange-600 text-white text-md"
                    onClick={addFolder}
                >
                    +
                </button>
            </div>
            <div className="flex flex-wrap w-full">
                {folders.map((folder) => (
                    <Folder 
                        key={folder.id} 
                        folderName={folder.folderName}
                    />
                ))}
            </div>
        </div>
    );
};

export default Fold;