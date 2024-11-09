
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Folder = ({ folderName }: { folderName: string }) => {
  return (
    <Link
      href={`/${folderName}/`}
      className="flex flex-col min-h-52 min-w-16 max-h-60 max-w-52 mr-[4rem]"
    >
      <button className="folder">
        <div className="folder-top p-1 text-md font-medium ">{folderName}</div>
        <div className="folder-body p-1">
          <Image src="https://utfs.io/f/orc4evzyNtrgcRB1p3PMZXyJ0fisTCozw2r135cv9768txUW" alt="folder-img" width={200} height={200} />
        </div>
      </button>
    </Link>
  );
};

export default Folder;
