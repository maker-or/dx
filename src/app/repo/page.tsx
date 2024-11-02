"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Greeting from "~/components/ui/Greeting";
import Navbar from "~/components/ui/Navbar";
import { ChevronLeft } from 'lucide-react';

// Define the type for branches and structure for subjects, chapters, and notes.
const branches = ["CSE", "EEE", "ECE", "MEC", "CIV", "IT", "CSO", "CSM", "CIC", "AI"] as const;
type Branch = typeof branches[number];
type Subject = Record<string, Record<string, string>>;
type SubjectsByBranch = Record<Branch, Subject>;

// Define subjects for different branches
const subjects: SubjectsByBranch = {
  CSE: {
    "Artificial Intelligence": {
      "Chapter 1": "https://cloud.link/to/ai/chapter1",
      "Chapter 2": "https://cloud.link/to/ai/chapter2",
      "Chapter 3": "https://cloud.link/to/ai/chapter3",
      "Chapter 4": "https://cloud.link/to/ai/chapter4",
      "Chapter 5": "https://cloud.link/to/ai/chapter5",
    },
    "Computer Networks": {
      "Chapter 1": "https://cloud.link/to/networks/chapter1",
      "Chapter 2": "https://cloud.link/to/networks/chapter2",
      "Chapter 3": "https://cloud.link/to/networks/chapter3",
      "Chapter 4": "https://cloud.link/to/networks/chapter4",
      "Chapter 5": "https://cloud.link/to/networks/chapter5",
    },
    "DWM": {
      "Chapter 1": "https://cloud.link/to/networks/chapter1",
      "Chapter 2": "https://cloud.link/to/networks/chapter2",
      "Chapter 3": "https://cloud.link/to/networks/chapter3",
      "Chapter 4": "https://cloud.link/to/networks/chapter4",
      "Chapter 5": "https://cloud.link/to/networks/chapter5",
    },
    "FED": {
      "Chapter 1": "https://cloud.link/to/networks/chapter1",
      "Chapter 2": "https://cloud.link/to/networks/chapter2",
      "Chapter 3": "https://cloud.link/to/networks/chapter3",
      "Chapter 4": "https://cloud.link/to/networks/chapter4",
      "Chapter 5": "https://cloud.link/to/networks/chapter5",
    },
    "FLAT": {
      "Chapter 1": "https://cloud.link/to/networks/chapter1",
      "Chapter 2": "https://cloud.link/to/networks/chapter2",
      "Chapter 3": "https://cloud.link/to/networks/chapter3",
      "Chapter 4": "https://cloud.link/to/networks/chapter4",
      "Chapter 5": "https://cloud.link/to/networks/chapter5",
    },
  },
  EEE: {
    "Circuits": {
      "Chapter 1": "https://cloud.link/to/circuits/chapter1",
      "Chapter 2": "https://cloud.link/to/circuits/chapter2",
      "Chapter 3": "https://cloud.link/to/circuits/chapter3",
      "Chapter 4": "https://cloud.link/to/circuits/chapter4",
      "Chapter 5": "https://cloud.link/to/circuits/chapter5",
    },
    // Other subjects...
  },
  ECE: {}, // Empty subjects for branches with no subjects defined
  MEC: {},
  CIV: {},
  IT: {},
  CSO: {},
  CSM: {},
  CIC: {},
  AI: {},
};

const Page = () => {
  const [selectedBranch, setSelectedBranch] = useState<Branch>("CSE");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<"notes" | "questionPapers">("notes");

  return (
    <div className="p-6">
      <Greeting />
      <Navbar />

      {/* Branch Selection */}
      <div className="flex w-full gap-12 mb-6 overflow-x-auto mt-4 items-center justify-center">
        {branches.map((branch) => (
          <button
            key={branch}
            onClick={() => { setSelectedBranch(branch); setSelectedSubject(null); }}
            className={`px-8 py-2 rounded-full ${
              selectedBranch === branch ? "bg-[#434080] text-white" : "bg-[#454545] text-[#f7eee3]"
            }`}
          >
            {branch}
          </button>
        ))}
      </div>

      {/* Selection between Notes and Question Papers */}
      {selectedSubject === null ? (
        <div className="flex flex-wrap gap-6 overflow-x-auto">
          {Object.keys(subjects[selectedBranch] || {}).map((subject) => (
            <div
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className="relative w-[250px] h-[220px] rounded-xl bg-gradient-to-l from-[#0c0c0c] via-[#434080] to-[#0c0c0c] border-2 border-[#f7eee3] flex flex-col items-center justify-center cursor-pointer"
            >
              <div className="absolute bottom-0 right-0 w-full bg-[#f7eee3] text-[#0c0c0c] text-lg font-medium px-3 py-1 rounded-b-xl text-center">
                {subject}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className='flex justify-between items-center my-6 p-2'>
          <button onClick={() => setSelectedSubject(null)} className="mb-4  py-2 flex text-lg  hover:text-orange-600  text-white rounded">
          <ChevronLeft />
            Back to Subjects
          </button>
          {/* Type Selection */}
          <div className="mb-4 flex gap-4">
            <button
              onClick={() => setSelectedType("notes")}
              className={`px-4 py-2 rounded-md ${selectedType === "notes" ? "bg-[#434080] text-white" : "bg-[#454545] text-[#f7eee3]"}`}
            >
              Notes
            </button>
            <button
              onClick={() => setSelectedType("questionPapers")}
              className={`px-4 py-2 rounded-md ${selectedType === "questionPapers" ? "bg-[#434080] text-white" : "bg-[#454545] text-[#f7eee3]"}`}
            >
              Question Papers
            </button>
          </div>

        </div>

          {/* Content Display based on Type Selection */}
          {selectedType === "notes" ? (
            <div className="flex flex-wrap gap-6 overflow-x-auto items-center justify-center">
              {selectedSubject && subjects[selectedBranch][selectedSubject] && 
                Object.entries(subjects[selectedBranch][selectedSubject]).map(([chapter, link]) => (
                  <Link key={chapter} href={link} target="_blank">
                    <div className="relative w-[250px] h-[220px] rounded-xl bg-gradient-to-l from-[#0c0c0c] via-[#434080] to-[#0c0c0c] border-2 border-[#f7eee3] flex flex-col items-center justify-center cursor-pointer">
                      {chapter}
                    </div>
                  </Link>
                ))
              }
            </div>
          ) : (
            <div className="flex flex-wrap gap-6 overflow-x-auto">
              {/* Example Question Papers; replace with actual data */}
              <Link href={`https://cloud.link/to/${selectedBranch}/${selectedSubject}/qp1`} target="_blank">
                <div className="w-[200px] h-[100px] bg-[#434080] text-white rounded-lg flex items-center justify-center text-center p-2">
                  Question Paper 1
                </div>
              </Link>
              <Link href={`https://cloud.link/to/${selectedBranch}/${selectedSubject}/qp2`} target="_blank">
                <div className="w-[200px] h-[100px] bg-[#434080] text-white rounded-lg flex items-center justify-center text-center p-2">
                  Question Paper 2
                </div>
              </Link>
              {/* Add more question papers as needed */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
