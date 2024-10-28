'use client';

import { type Message, useChat } from 'ai/react';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';

interface ChatHelpers {
  messages: Message[];
  input: string;
  handleSubmit: (event: React.FormEvent) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isLoading: boolean;
}

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: []
  }) as ChatHelpers;
  
  // State to track whether input has been submitted
  const [submitted, setSubmitted] = useState(false);

  // Modified handleSubmit to update the `submitted` state
  const onSubmit = (event: React.FormEvent) => {
    setSubmitted(true);  // Set the submitted state to true
    handleSubmit(event); // Call the actual handleSubmit function
  };

  return (
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#FF5E00_150%)]">
      
      {/* Conditionally render the title based on the `submitted` state */}
      {!submitted && (
        <h1 className="flex items-center justify-center italic text-[4rem] mb-6">Ask anything</h1>
      )}

      <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap">
              <div>
                <div className="font-bold">{m.role}</div>
                <p>{m.content}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit} className="w-full max-w-xl  flex items-center justify-center bg-slate-500">
          {/* Adjust input field position based on `submitted` state */}
          <div className={`${submitted ? 'fixed bottom-9' : 'flex justify-center '} mb-12 w-full max-w-xl bg-[#FFF8E7] rounded-full px-2`}>
          <div className=" inset-y-0 left-0 flex items-center pl-3">
              <Sparkles className="h-6 w-6 text-orange-500" />
            </div>
            <input
              type="text"
              placeholder="SphereAI..."
              value={input}
              onChange={handleInputChange}
              className="w-full pl-4 pr-4 py-3  bg-[#FFF8E7] text-black rounded-full placeholder-gray-600 outline-none"
            />

          </div>
        </form>
      </div>
    </div>
  );
}
