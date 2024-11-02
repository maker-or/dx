import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { convertToCoreMessages, streamText  } from "ai";
import { type NextRequest } from 'next/server';


export const maxDuration = 60;

interface ConvertibleMessage {
  role: 'user' | 'assistant';
  content: string;
  id?: string;
}



// const pinecone = new Pinecone({
//     apiKey: process.env.PINECONE_API_KEY ?? "",
// });

const google = createGoogleGenerativeAI({
    baseURL: 'https://generativelanguage.googleapis.com/v1beta',
    apiKey: process.env.GEMINI_API_KEY
});


const model = google('models/gemini-1.5-pro-latest', {
    safetySettings: [
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
    ],
});




export async function POST(req: NextRequest) {

  const body = await req.json() as { messages: ConvertibleMessage[] };
  // const userMessage = body.messages.find(msg => msg.role === 'user')?.content;
  
  

 
  // const retrievals = await queryPineconeVectorStore(pinecone, 'medic', userMessage);
  // const context = retrievals.map((item) => item.content).join('\n');

  // const messagesWithContext = [
  //   {
  //     role: 'system',
  //     content: `You are SPHEREAI. Use the following context to answer the user's question:\n${context}`,
  //   },
  //   ...convertToCoreMessages(body.messages),
  // ];
    
    const result = await streamText({
        model: model,
        system: 'You are SPHEREAI,search the knowledge base and answer the question if you cannot find the answer in the knowledge base then search the internet and answer the question.',
        messages: convertToCoreMessages(body.messages),
       
        

    });

    return result.toDataStreamResponse();
}


