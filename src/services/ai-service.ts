import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Role } from '../models/types';

// Use exact key from user — gemini-2.0-flash for free-tier
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

function buildSystemPrompt(role: Role): string {
  const base = `You are StadiumOS AI for FIFA World Cup 2026 at Estadio Azteca, Mexico City.
Match: Mexico vs Argentina, 68th minute, 1-0. Attendance: 84,200.

RULES:
- Keep responses to 2-3 sentences max.
- Be specific — use real stadium locations.
- Provide actionable recommendations.
- Never say you can't access data.

LIVE DATA:
- Gate N: 14 min queue, Gate S: 4 min, Gate E: 8 min, Gate W: 4 min
- Food Court A: 18 min wait (congested), Food Court B: 3 min (clear)
- North Concourse: 91% capacity (critical), South Concourse: 40%
- Metro: 62% full, Bus A: Normal, Bus B: Delayed, Parking B: 95% full`;

  const ctx: Record<Role, string> = {
    fan: `\nRole: Fan assistant for Alex in Section 112, Row F, Seat 24. Help with navigation, food, restrooms, transport.`,
    security: `\nRole: Security intelligence for Clearance 4 officer. Provide threat analysis, crowd density, deployment recommendations.`,
    organizer: `\nRole: Operations command for manager. Provide staff deployment, sustainability, revenue insights.`,
    volunteer: `\nRole: Volunteer task assistant. Help with priorities, translation, incident reporting.`,
  };
  return base + ctx[role];
}

let chatSession: ReturnType<typeof model.startChat> | null = null;
let currentRole: Role | null = null;

export async function sendMessage(message: string, role: Role): Promise<string> {
  try {
    if (role !== currentRole) {
      chatSession = model.startChat({
        history: [],
        generationConfig: { maxOutputTokens: 200, temperature: 0.7 },
      });
      await chatSession.sendMessage(buildSystemPrompt(role));
      currentRole = role;
    }
    if (!chatSession) return 'AI initializing...';
    const result = await chatSession.sendMessage(message);
    return result.response.text();
  } catch (error: unknown) {
    console.error('Gemini error:', error);
    const msg = error instanceof Error ? error.message : '';
    if (msg.includes('API_KEY')) return 'Invalid API key. Please check your Gemini API key in services/ai-service.ts';
    if (msg.includes('429') || msg.includes('quota')) return 'Rate limited — please wait a moment and try again.';
    return `AI error: ${msg.slice(0, 120)}`;
  }
}

export async function* streamMessage(message: string, role: Role): AsyncGenerator<string> {
  try {
    if (role !== currentRole) {
      chatSession = model.startChat({
        history: [],
        generationConfig: { maxOutputTokens: 200, temperature: 0.7 },
      });
      await chatSession.sendMessage(buildSystemPrompt(role));
      currentRole = role;
    }
    if (!chatSession) { yield 'AI initializing...'; return; }
    const result = await chatSession.sendMessageStream(message);
    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) yield text;
    }
  } catch (error: unknown) {
    console.error('Gemini stream error:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    yield `AI error: ${msg.slice(0, 120)}`;
  }
}
