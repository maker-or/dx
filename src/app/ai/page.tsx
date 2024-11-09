'use client';

import React, { useState, useRef, useEffect } from 'react';
import { type Message, useChat } from 'ai/react';
import { Sparkles, User, ArrowUpRight } from 'lucide-react';
import '~/styles/globals.css';

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
  
  const [submitted, setSubmitted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim()) return;
    setSubmitted(true);
    handleSubmit(event);
  };

  return (
    <div className="absolute inset-0 -z-10 h-full w-full flex flex-col items-center px-5 py-12 bg-gradient-to-b from-[#180B03] to-[#000]">
      {!submitted && (
        <div className="flex flex-col items-center gap-4 mb-8">
          <h1 className="text-5xl md:text-6xl text-white animate-fade-in">
            Ask Anything
          </h1>
        </div>
      )}

      <div className="flex flex-col w-full max-w-2xl mx-auto h-full">
        <div className={`flex-1 overflow-y-auto px-4 ${submitted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
          {messages.map((m, index) => (
            <div
              key={m.id}
              className={`flex items-start gap-4 mb-4 animate-slide-in ${m.role === 'user' ? 'justify-start' : 'justify-start'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {m.role === 'user' ? (
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-orange-500">
                    <User size={18} />
                  </div>
                  <div className="max-w-xs bg-orange-200 text-black rounded-xl p-4">
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-4 font-mono">
                  <div className="max-w-screen-lg text-[#f7eee3] rounded-xl p-4">
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  </div>
                  <div className="w-8 h-8 p-2 rounded-full flex items-center justify-center bg-orange-500">
                    <Sparkles size={24} />
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={onSubmit} className="mt-4">
          <div className={`relative flex items-center border-2 border-[#f7eee3]/10 rounded-full transition-all duration-500 ${submitted ? 'mb-6' : 'mt-4'}`}>
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={handleInputChange}
              className="w-full pl-8 pr-16 py-4 bg-[#0c0c0c] text-white rounded-full placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-500/40 transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="absolute right-1 p-3 rounded-full bg-[#2C2C2C] text-[#f7eee3] hover:bg-white/10 hover:text-orange-600 transition-colors disabled:opacity-50"
            > 
              <ArrowUpRight className="h-6 w-6 text-[#f7eee3] hover:text-orange-600" />
            </button>
          </div>
        </form>
      </div>
       <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
