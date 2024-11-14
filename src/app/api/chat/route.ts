// import { createGoogleGenerativeAI } from '@ai-sdk/google';
// import { convertToCoreMessages, streamText  } from "ai";
// import { type NextRequest } from 'next/server';


// export const maxDuration = 60;

// interface ConvertibleMessage {
//   role: 'user' | 'assistant';
//   content: string;
//   id?: string;
// }



// // const pinecone = new Pinecone({
// //     apiKey: process.env.PINECONE_API_KEY ?? "",
// // });

// const google = createGoogleGenerativeAI({
//     baseURL: 'https://generativelanguage.googleapis.com/v1beta',
//     apiKey: process.env.GEMINI_API_KEY
// });


// const model = google('models/gemini-1.5-pro-latest', {
//     safetySettings: [
//         { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
//     ],
// });




// export async function POST(req: NextRequest) {

//   const body = await req.json() as { messages: ConvertibleMessage[] };

    
//     const result = await streamText({
//         model: model,
//         system: 'You are SPHEREAI,search the knowledge base and answer the question if you cannot find the answer in the knowledge base then search the internet and answer the question.',
//         messages: convertToCoreMessages(body.messages),

//     });

//     return result.toDataStreamResponse();
// }


// import { type NextRequest } from 'next/server';
// import { GoogleGenerativeAI } from '@google/generative-ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { getEmbedding } from '~/utils/embeddings';
import { type ConvertibleMessage } from '~/utils/types';
import { streamText } from "ai";
import { Pinecone } from '@pinecone-database/pinecone';

// Define a type for the expected request body structure
interface RequestBody {
  messages: ConvertibleMessage[];
}

export async function POST(req: Request): Promise<Response> {
  try {
    console.log("welcome to ai");
    
    // Parse the request JSON with explicit typing
    const body = await req.json() as RequestBody;

    if (!body.messages || body.messages.length === 0) {
      throw new Error('No messages provided');
    }

    const lastMessage = body.messages[body.messages.length - 1];
    if (!lastMessage?.content) {
      throw new Error('No valid last message found');
    }

    const query = lastMessage.content;
    console.log(query);

    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY ?? "",
    });

    // Get embeddings for the query
    const queryEmbedding = await getEmbedding(query);
    console.log(queryEmbedding);

    // Query Pinecone
    const index = pinecone.index('k');
    const queryResponse = await index.query({
      vector: queryEmbedding,
      topK: 5,
      includeMetadata: true,
    });

    console.log(queryResponse);

    // Safely filter and map matches with metadata
    const context = queryResponse.matches
      .filter((match) => match.metadata && typeof match.metadata.content === 'string')
      .map((match) => match.metadata!.content as string)
      .join('\n\n');

    console.log(context);

    const google = createGoogleGenerativeAI({
      baseURL: 'https://generativelanguage.googleapis.com/v1beta',
      apiKey: process.env.GEMINI_API_KEY
    });

    const model = google('models/gemini-1.5-pro-latest', {
      safetySettings: [
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
      ],
    });

    // Prepare the prompt string with correct context formatting
    const final_prompt = `Context: ${context}\n\nQuestion: ${query}\n\nPlease provide a detailed answer based on the context provided.`;
    
    console.log(context)
    console.log(query)
    console.log(final_prompt)

    const result = await streamText({
      model: model,
      system: 'Your job is to genrate the answers to the biven question',
      prompt: final_prompt,

    });

    return result.toDataStreamResponse();

  } catch (error) {
    console.error('Error in chat route:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while processing your request' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
