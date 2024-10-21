'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const Navbar = () => {
  const pathName = usePathname();

  // Function to check if the current path matches the link's path
  const isActive = (path: string) => pathName === path;

  return (
    <nav className="py-5">
      <div   className="items-center flex">
        <ul className="inline-flex flex-row items-center mx-auto bg-[#1f1f1f] py-2.5 px-3 rounded-full border text-[#646464] text-[1.2rem] font-medium">
          <li className="px-2">
          <Link href="/">
  <Image src="/men.png" alt="logo" width={100} height={50} />
</Link>
          </li>


          {/* <li className="px-2">
            <Link href="/Forum">
              <button
                className={`rounded-full px-4 py-3 ${
                  isActive('/Forum') ? 'bg-[#FF5E00] text-[#0c0c0c]' : ''
                }`}
              >
                Forum
              </button>
            </Link>
          </li> */}

          <li className="px-2">
            <Link href="/Repos">
              <button
                className={`rounded-full px-4 py-3 ${
                  isActive('/Repos') ? 'bg-[#FF5E00] text-[#0c0c0c]' : ''
                }`}
              >
                Repos
              </button>
            </Link>
          </li>

          <li className="px-2">
            <Link href="/">
              <button
                className={`rounded-full px-4 py-3 ${
                  isActive('/') ? 'bg-[#FF5E00] text-[#0c0c0c]' : ''
                }`}
              >
                Space
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
