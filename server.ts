// server.ts
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are rice-daemon, a helpful Unix terminal assistant specialized in Leela's projects, skills, and experience. Provide concise and accurate information.",
});

app.post('/api/query-gemini', async (req, res) => {
  const { message } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    const msgLower = (message || "").toLowerCase();
    let reply = "";
    if (msgLower.includes("skill") || msgLower.includes("expert")) {
      reply = "[rice-daemon]: Offline node loaded. Leela is experienced in Java, Python, Go, TypeScript, React/Next.js, FastAPI, and AI agentic flows (LangGraph/LangChain). Run the `skills` command in the terminal for a full visual breakdown.";
    } else if (msgLower.includes("project") || msgLower.includes("work")) {
      reply = "[rice-daemon]: Offline node loaded. Leela's major projects include KnowledgeNav.io (hybrid RAG with RAGAS evaluations), LeeGo (concurrent WebSocket load-tester in Go), and a Genetic Algorithm Timetable Optimization scheduler. Run the `projects` command in the terminal to inspect them.";
    } else if (msgLower.includes("bio") || msgLower.includes("about") || msgLower.includes("who is")) {
      reply = "[rice-daemon]: Offline node loaded. Leela Mahalakshmi M is a CSE undergraduate at Amrita Vishwa Vidyapeetham. She is Vice Chair of the ACM Student Chapter. Check the `about/bio.md` file in Ranger File Explorer or type `about` in the terminal for her bio profile.";
    } else {
      reply = "[rice-daemon]: Warning: GEMINI_API_KEY is not configured on this host. Operating in offline emulation mode. Ask me about Leela's skills, projects, or background!";
    }
    return res.json({ reply });
  }

  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }

  try {
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();
    res.json({ reply: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to query Gemini API' });
  }
});

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
