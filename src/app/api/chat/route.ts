import { openai } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText } from 'ai';
import { type NextRequest, NextResponse } from 'next/server';

// Define type for the incoming message payload
interface ConvertibleMessage {
  role: 'user' | 'assistant';
  content: string;
  id?: string;  
}


export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    
    const body = await req.json() as { messages: ConvertibleMessage[] };

    const result = await streamText({
      model: openai('gpt-4o'),
      messages: convertToCoreMessages(body.messages),
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error processing chat request:', error);
    return NextResponse.json({ error: 'Failed to process the request' }, { status: 500 });
  }
}
