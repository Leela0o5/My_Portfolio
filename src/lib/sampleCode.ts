// src/lib/sampleCode.ts
export const sampleCode = `import { LangGraph, OpenAI } from 'langchain';
import { ChromaDB } from 'chromadb';

// Leela's Agentic Hybrid RAG Pipeline Engine
export class HybridRAGPipeline {
  private vectorDb: ChromaDB;
  private llm: OpenAI;

  constructor() {
    this.vectorDb = new ChromaDB({ collection: 'knowledgenav' });
    this.llm = new OpenAI({ model: 'gpt-4o-mini', temperature: 0.1 });
  }

  async run(query: string) {
    console.log(\`[RAG] Initiating retrieval for query: "\${query}"\`);
    
    // 1. Hybrid Search (Dense + Sparse BM25)
    const context = await this.vectorDb.hybridSearch(query, {
      bm25Weight: 0.4,
      vectorWeight: 0.6
    });

    // 2. Rerank retrieved nodes using Cohere Cross-Encoder
    const rerankedNodes = await this.rerank(context, query);

    // 3. Generate response with citation validation
    const response = await this.generateAndValidate(rerankedNodes, query);
    return response;
  }
}
`;
