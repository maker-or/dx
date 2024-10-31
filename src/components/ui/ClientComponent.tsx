'use client';
import React, { useState } from 'react';
import { useFolder } from '../../components/ui/FolderContext';
import { UploadButton } from '../../utils/uploadthing';
import Link from 'next/link';

interface ClientComponentProps {
  images: { id: number; url: string; name: string }[];
}

const ClientComponent: React.FC<ClientComponentProps> = ({ images }) => {
  const { folderName, setFolderName } = useFolder();
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleFolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center mb-4">
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
        <button
          onClick={() => setModalOpen(true)}
          className="px-3 py-1 rounded-lg bg-orange-600 text-[#f7eee3] text-md"
        >
          +
        </button>
      </div>

      {/* Modal for Upload */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center  justify-center z-50">
          <div className=" rounded-lg bg-[#0c0c0cae] p-4  backdrop-blur-lg	 border-[#f7eee3] border-2 w-2/3 h-1/2 max-w-lg">
            <div className="flex justify-between items-center m-1 p-4">
              <h2 className="text-lg ">Upload Your File</h2>
              <button
                onClick={() => setModalOpen(false)}
                className=" px-3 py-1 bg-orange-600 text-[#f7eee3] rounded-lg"
              >
                Close
              </button>
            </div>

            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={() => {
                setModalOpen(false);
                window.location.reload();

              }}
              className="border-2 border-dashed w-full h-2/3 text-[#f7eee3] py-2 rounded hover:border-orange-300"
            />

          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-6 w-full h-[250px]">
        {images?.map((image, index) => (
          <div
            key={image.id + '-' + index}
            className="flex flex-col items-center justify-center gap-6"
          >
            <Link
              href={image.url}
              target="_blank"
              className="flex flex-col items-center justify-center"
            >
              <div className="relative w-[250px] h-[220px] rounded-xl bg-gradient-to-tr from-[#0c0c0c] via-[#ff5e007b] to-[#0c0c0c] border-2 border-[#f7eee3]">
                <div className="absolute bottom-0 right-0 w-full bg-[#f7eee3] text-[#0c0c0c] text-md font-medium px-3 py-1 rounded-b-xl text-nowrap">
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
