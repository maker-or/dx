"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Greeting from "~/components/ui/Greeting";
import Navbar from "~/components/ui/Navbar";

// Define the type for subjects
const branches = ["CSE", "EEE", "ECE", "MEC", "CIV", "IT", "CSO", "CSM", "CIC", "AI"] as const;
type Branch = typeof branches[number]; // Define a type that is one of the branch names

const subjects: Record<Branch, string[]> = {
  CSE: ["Data Structures", "Algorithms", "Operating Systems", "Database Systems"],
  EEE: ["Circuits", "Electromagnetics", "Control Systems", "Power Electronics"],
  ECE: ["Digital Electronics", "Microprocessors", "Communication Systems", "VLSI"],
  MEC: ["Thermodynamics", "Fluid Mechanics", "Solid Mechanics", "Machine Design"],
  CIV: ["Structural Engineering", "Hydraulics", "Geotechnical Engineering", "Transportation"],
  IT: ["Web Development", "Software Engineering", "Networks", "Machine Learning"],
  CSO: ["Cyber Security", "Cryptography", "Network Security", "Digital Forensics"],
  CSM: ["Cloud Computing", "Big Data", "Data Science", "Machine Learning"],
  CIC: ["Computer Vision", "Image Processing", "Pattern Recognition", "AI Fundamentals"],
  AI: ["AI Basics", "Neural Networks", "Deep Learning", "Reinforcement Learning"]
};

const Page = () => {
  const [selectedBranch, setSelectedBranch] = useState<Branch>("CSE");

  return (
    <div className="p-6">
      <Greeting />
      <Navbar />
      <h1 className="text-3xl mt-4 mb-4">Subjects</h1>

      {/* Branch Selection */}
      <div className="flex w-full  gap-12 mb-6 overflow-x-auto mt-4  items-center ">
        {branches.map((branch) => (
          <button
            key={branch}
            onClick={() => setSelectedBranch(branch)}
            className={`px-8 py-2 rounded-full ${
              selectedBranch === branch ? "bg-[#434080] text-white" : "bg-[#454545] text-[#f7eee3]"
            }`}
          >
            {branch}
          </button>
        ))}
      </div>

      

      {/* Subject Display */}
      <div className="flex flex-wrap gap-6  overflow-x-auto ">
        {subjects[selectedBranch]?.map((subject, index) => (
          <Link key={index} target="_blank" href="">
            <div className="relative w-[250px] h-[220px] rounded-xl bg-gradient-to-l from-[#0c0c0c] via-[#434080] to-[#0c0c0c] border-2 border-[#f7eee3] flex flex-col items-center justify-center">
              <div className="absolute bottom-0 right-0 w-full bg-[#f7eee3] text-[#0c0c0c] text-lg font-medium px-3 py-1 rounded-b-xl text-center">
                {subject}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
