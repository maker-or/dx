'use client';
import React, { useState } from 'react';
import { useFolder } from '../../components/ui/FolderContext';
import { UploadButton  } from '../../utils/uploadthing';
import Image from 'next/image'
import Link from 'next/link';

interface ClientComponentProps {
  images: { id: number; url: string; name: string }[]; // Define the type based on the structure of your image data
}

const ClientComponent: React.FC<ClientComponentProps> = ({ images }) => {
  const { folderName, setFolderName } = useFolder();
  const [isEditing, setIsEditing] = useState(false);

  const handleFolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value); // Update folder name in context
  };

  const handleBlur = () => {
    setIsEditing(false); // Save and exit editing mode on blur (click outside)
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false); // Save and exit editing mode on Enter key
    }
  };

  return (
    <div className=" flex-col gap-2 w-full">



      <div className='flex justify-between items-center mb-4'>
        <div className="w-full">
          {isEditing ? (
            <input
              type="text"
              value={folderName}
              onChange={handleFolderNameChange}
              onBlur={handleBlur}
              onKeyPress={handleKeyPress}
              autoFocus
              className="outline-none text-orange-600 bg-transparent border-none text-3xl"
            />
          ) : (
            <h1
              className="text-3xl cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              {folderName}
            </h1>
          )}
        </div>



        <div>
         <button className="px-3 py-1 rounded-lg bg-orange-600 text-white text-md">
            +
        </button> 
        </div>
      </div>




      <UploadButton
      className='bg-orange-600 w-1/6'
      
        endpoint="imageUploader"
        onClientUploadComplete={() => {
          window.location.reload();
        }}
      />

      <div className="flex flex-wrap gap-6 w-full h-[250px]">
        {images?.map((image, index) => (
          <div key={image.id + '-' + index} className="flex flex-col items-center justify-center gap-6">
            <Link href={image.url} target='_blank' className='flex flex-col items-center justify-center'>
              <div className='relative w-[250px] h-[220px]  rounded-xl bg-gradient-to-tr from-[#0c0c0c] via-[#ff5e007b] to-[#0c0c0c] border-2 border-[#f7eee3]'>

                <div className='absolute bottom-0 right-0 w-full  bg-[#f7eee3] text-[#0c0c0c] text-md font-medium px-3 py-1 rounded-b-xl text-nowrap'>
                  {image.name}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientComponent;
