// import { type Pinecone } from "@pinecone-database/pinecone";
// import { createGoogleGenerativeAI } from '@ai-sdk/google';

// interface EmbeddingResponse {
//   data: {
//     embedding: number[];
//   };
// }

// interface QueryMatch {
//   metadata?: {
//     chunk?: string;
//   };
// }

// // Helper function to format index results
// function formatIndexResults(indexName: string, matches: QueryMatch[]): string {
//   return matches.length > 0
//     ? matches.map((match, idx) => {
//         const chunk = match.metadata?.chunk ?? "";
//         return `\nResult from ${indexName} - Match ${idx + 1}:\n${chunk}`;
//       }).join(". \n\n")
//     : "No relevant information found.";
// }

// export async function queryMultiplePineconeIndexes(
//   client: Pinecone,
//   indexNames: string[],
//   query: string
// ): Promise<string> {
//   try {
//     const google = createGoogleGenerativeAI({
//       baseURL: 'https://generativelanguage.googleapis.com/v1beta',
//       apiKey: process.env.GEMINI_API_KEY ?? ''
//     });

//     // Generate embeddings for the query text
//     const model = google.models.textEmbedding('text-embedding-004') 
    
//     const embeddingResponse = await model.embeddings({ 
//       content: query 
//     }) as EmbeddingResponse;
    
//     if (!embeddingResponse?.data?.embedding) {
//       throw new Error('Failed to retrieve embeddings from Google API.');
//     }

//     const queryEmbedding = Array.from(embeddingResponse.data.embedding);
//     let aggregatedResults = "";

//     // Query each index and aggregate the results
//     for (const indexName of indexNames) {
//       const index = client.Index(indexName);
//       const queryResponse = await index.query({
//         topK: 5,
//         vector: queryEmbedding,
//         includeMetadata: true,
//         includeValues: false
//       });

//       const matches = (queryResponse.matches || []) as QueryMatch[];
//       const indexResults = formatIndexResults(indexName, matches);

//       aggregatedResults += indexResults + "\n\n";
//     }

//     return aggregatedResults.trim() || "No relevant information found across all indexes.";
//   } catch (error) {
//     const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
//     throw new Error(`Failed to query Pinecone indexes: ${errorMessage}`);
//   }
// }
