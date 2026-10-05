import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Shared server-side Gemini client
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured on the server. Please ensure it is set in Settings > Secrets.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

interface ChatMessage {
  role: 'user' | 'assistant' | 'model';
  content: string;
}

// POST /api/chat - Multi-turn conversational interface with Search Grounding
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const {
      messages = [],
      model = 'gemini-3.5-flash',
      enableSearch = true,
      role = 'editorial_researcher',
      currentArticleContext
    } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const ai = getAiClient();

    // Map model selection
    // Guidelines: gemini-3.1-pro-preview for complex tasks, gemini-3.5-flash for general tasks (supports search), gemini-3.1-flash-lite for fast tasks
    let selectedModel = 'gemini-3.5-flash';
    if (model === 'gemini-3.1-flash-lite' || model === 'fast') {
      selectedModel = 'gemini-3.1-flash-lite';
    } else if (model === 'gemini-3.1-pro-preview' || model === 'complex') {
      selectedModel = 'gemini-3.1-pro-preview';
    } else {
      selectedModel = 'gemini-3.5-flash';
    }

    let roleDescription = 'Alter Senior Editorial Researcher';
    if (role === 'fact_checker') {
      roleDescription = 'Alter Investigative Fact-Checker & Policy Auditor';
    } else if (role === 'essay_companion') {
      roleDescription = 'Alter Literary & Sociological Companion';
    }

    const systemInstruction = `You are "${roleDescription}" for Alter — an independent editorial publication dedicated to deep, courageous dispatches and essays on education, society, and culture with a special focus on Bangladesh and South Asia.

Your voice is intellectually rigorous, nuanced, graceful, and evidence-grounded. You never rely on clichés, moral posturing, or superficial talking points.
${currentArticleContext ? `\nActive Reading Context: The reader is currently examining the essay: "${currentArticleContext.title}".\nSummary: ${currentArticleContext.subtitle || currentArticleContext.excerpt}\n` : ''}
Key capabilities:
1. Provide deep historical, statistical, and policy context on education reforms (e.g. HSC exam results, coaching class dependency), public space & gender mobility, reproductive rights & cultural silence, and technology policy (e.g. SSC laptop giveaways vs Doel e-waste).
2. If Google Search grounding is enabled or when answering contemporary queries, synthesize current real-world information and verify facts accurately.
3. Formulate your response in clean Markdown with clear headings or bullet points where helpful.`;

    // Map conversation history
    const contents = messages.map((m: ChatMessage) => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    // Search grounding configuration: Use gemini-3.5-flash with googleSearch tool
    const tools = (enableSearch && selectedModel === 'gemini-3.5-flash')
      ? [{ googleSearch: {} }]
      : undefined;

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents,
      config: {
        systemInstruction,
        ...(tools ? { tools } : {}),
      }
    });

    const text = response.text || '';
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    const groundingChunks = groundingMetadata?.groundingChunks || [];
    
    interface WebSource {
      title: string;
      url: string;
    }
    const webSources: WebSource[] = [];
    const seenUrls = new Set<string>();

    for (const chunk of groundingChunks as any[]) {
      if (chunk.web?.uri && !seenUrls.has(chunk.web.uri)) {
        seenUrls.add(chunk.web.uri);
        webSources.push({
          title: chunk.web.title || chunk.web.uri,
          url: chunk.web.uri
        });
      }
    }

    const webSearchQueries: string[] = groundingMetadata?.webSearchQueries || [];

    return res.json({
      text,
      webSources,
      webSearchQueries,
      model: selectedModel
    });
  } catch (err: any) {
    console.error('Chat endpoint error:', err);
    return res.status(500).json({
      error: err.message || 'An error occurred while generating editorial response.'
    });
  }
});

// POST /api/analyze-essay - Grounded live analysis of an essay using Gemini 3.5 Flash + Search
app.post('/api/analyze-essay', async (req: Request, res: Response) => {
  try {
    const { articleTitle, articleSubtitle, analysisType = 'takeaways' } = req.body;
    if (!articleTitle) {
      return res.status(400).json({ error: 'articleTitle is required.' });
    }

    const ai = getAiClient();

    let prompt = '';
    if (analysisType === 'takeaways') {
      prompt = `Provide a concise 3-point editorial executive summary and 2 critical discussion questions for the essay titled: "${articleTitle}". Subtitle: "${articleSubtitle}". Focus on structural insights and systemic implications.`;
    } else if (analysisType === 'fact_check') {
      prompt = `Verify and provide the latest 2025-2026 real-world statistics, policy updates, and ground realities related to the topic of: "${articleTitle}". Subtitle: "${articleSubtitle}". Use Google Search data to ground your findings with contemporary reports.`;
    } else {
      prompt = `Provide a deep critical commentary on the core thesis of "${articleTitle}". What counter-arguments or policy solutions exist? Ground with current data.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are a senior editorial researcher at Alter publication. Provide rigorous, fact-checked analytical commentary grounded in real-world facts.',
        tools: [{ googleSearch: {} }]
      }
    });

    const text = response.text || '';
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    const groundingChunks = groundingMetadata?.groundingChunks || [];

    const webSources = (groundingChunks as any[])
      .filter(c => c.web?.uri)
      .map(c => ({
        title: c.web.title || c.web.uri,
        url: c.web.uri
      }));

    return res.json({
      text,
      webSources,
      webSearchQueries: groundingMetadata?.webSearchQueries || []
    });
  } catch (err: any) {
    console.error('Analyze essay error:', err);
    return res.status(500).json({
      error: err.message || 'Failed to analyze essay.'
    });
  }
});

// Start server with Vite middleware in dev or static files in prod
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
