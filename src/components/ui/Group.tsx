'use client';
import React from 'react';
import Image from 'next/image';

const Group = () => {
  return (
    <div className="overflow-hidden h-full w-full">
      <h1 className="text-[20rem]  text-[#fff3] absolute z-0">
         <Image src="/Sphere.png" alt="Sphere logo" layout="fill" objectFit="cover" /> 
      </h1>
      <div className="relative z-10">
      </div>
    </div>
  );
};

export default Group;
