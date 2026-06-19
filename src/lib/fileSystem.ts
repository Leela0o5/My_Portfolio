// src/lib/fileSystem.ts
export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
}

export const fileSystem: FileNode = {
  name: 'root',
  type: 'folder',
  children: [
    {
      name: 'about',
      type: 'folder',
      children: [
        {
          name: 'bio.md',
          type: 'file',
          content: `# LML👀
Engineer • Software dev • Open Source

## About Me
I like building things from scratch — shipping small, fast, understandable code.

## Education
- **Amrita Vishwa Vidyapeetham** (Aug 2023 - Present)
  Bachelor of Technology in Computer Science and Engineering

## Experience
- **Vice Chair and Frontend Developer** | ACM Student Chapter, Amrita Vishwa Vidyapeetham (Feb 2025 - Mar 2026)
  Contributed frontend features to the Amrita Season of Code platform (Next.js, TypeScript, Tailwind CSS) with 7+ merged commits; organized workshops, hackathons, and technical events for 100+ student participants.
- **Open Source Contributor** | Amrita Winter of Code (Dec 2024 - Jan 2025)
  Contributed to open-source repositories using Git workflows, issue tracking, and pull request reviews.

## Projects
- **KnowledgeNav.io --- Hybrid RAG System**
  GitHub: https://github.com/Leela0o5/KnowledgeNav.io
  Demo: https://knowledge-nav-io.vercel.app/
  Stack: Python, FastAPI, LangChain, LangGraph, TypeScript, React, PostgreSQL, ChromaDB, Redis, Docker
  Features: Agentic RAG pipeline (LangGraph: analyse -> retrieve -> rerank -> generate -> validate -> persist) with hybrid retrieval and cross-encoder reranking. Deployed via GitHub Actions CI/CD.

- **LeeGo --- WebSocket Load Testing CLI and Go Library**
  GitHub: https://github.com/Leela0o5/LeeGo
  Stack: Go, WebSockets, Concurrency
  Features: Concurrent Go WebSocket load-testing CLI using goroutines and channels; outputs structured JSON reports.

- **Timetable Optimization Engine**
  GitHub: https://github.com/Leela0o5/Timetable-Optimization-Engine
  Demo: https://timetable-app-taupe.vercel.app/
  Stack: MERN, Docker, Swagger, Genetic Algorithms
  Features: Genetic Algorithm scheduler enforcing 6 hard and 7 weighted soft constraints.

- **Dead Poets Society --- Poetry Sharing Platform**
  GitHub: https://github.com/Leela0o5/Dead-Poets-Society
  Demo: https://dead-poets-society-one.vercel.app/
  Stack: MongoDB, Express.js, React, Node.js, JWT
  Features: Full-stack MERN poetry platform with JWT authentication and responsive content workflows.

## Achievements
- **Hackathon Finalist (Top 50)** -- Built an MCP-powered on-chain arbitrage system on BNB Chain using LangGraph for agentic decision-making. GitHub: https://github.com/Leela0o5/ArbiChain
- **NPTEL Topper** -- Ranked topper in "Introduction to Machine Learning" (IIT Kharagpur).
- **HackerRank 5-Star Java Programmer**
- **NSS Volunteer**, Amrita School of Computing
`,
        },
        {
          name: 'contact.txt',
          type: 'file',
          content: `Contact & Profile Links
=======================
Email: leela592023@gmail.com
GitHub: https://github.com/Leela0o5
LinkedIn: http://www.linkedin.com/in/leela-m-336334301
LeetCode: https://leetcode.com/u/leela592023
Codeforces: https://codeforces.com/profile/leela592023
CodeChef: https://www.codechef.com/users/leela592023
X (Twitter): https://x.com/@Leela679698
`,
        },
      ],
    },
    {
      name: 'hyprland.conf',
      type: 'file',
      content: `# Hyprland Rice Configuration
monitor=,preferred,auto,1

input {
    kb_layout=us
    follow_mouse=1
}

general {
    gaps_in=8
    gaps_out=16
    border_size=2
    col.active_border=0xffcba6f7
    col.inactive_border=0xff313244
}

decoration {
    rounding=10
    blur=true
}
`,
    },
    {
      name: 'install.sh',
      type: 'file',
      content: `#!/bin/bash
# Leela's Portfolio Setup Script

echo "Initializing developer environment..."

# Install dependencies
pnpm install

# Build production bundle
pnpm build

# Start development workspace
pnpm dev

echo "Setup completed successfully!"
`,
    },
  ],
};
