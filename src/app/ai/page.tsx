'use client';

import { type Message, useChat } from 'ai/react';

interface ChatHelpers {
  messages: Message[];
  input: string;
  handleSubmit: (event: React.FormEvent) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isLoading: boolean;
}

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    initialMessages: []
  }) as ChatHelpers;

  return (
    <>
      {messages.map((message: Message) => (
        <div key={message.id}>
          {message.role === 'user' ? 'User: ' : 'AI: '}
          {message.content}
        </div>
      ))}

      <div className='flex-row items-center justify-center w-full min-h-full gap-2 '>
      <form onSubmit={handleSubmit}>
        <input name="prompt" value={input} onChange={handleInputChange} className=' w-[80%] p-4 h-12 rounded-md outline-none ' />
        <button type="submit" disabled={isLoading} className='bg-blue-500 text-white rounded-md p-3 disabled:opacity-50'>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      </div>


    </>
  );
}
