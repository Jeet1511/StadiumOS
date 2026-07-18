import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Role } from '../types';

const API_KEY = 'AIzaSyAb8RN6JQoCqZ_Jt1NcmR7RjVQHKKSXzyzJzPuKM-WbeuRtOjWQ';
const genAI = new GoogleGenerativeAI(API_KEY);

// Use gemini-2.0-flash — fast, free-tier friendly
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

function buildSystemPrompt(role: Role): string {
  const base = `You are StadiumOS AI, an intelligent assistant for the FIFA World Cup 2026 at Estadio Azteca, Mexico City.
Current match: Mexico vs Argentina (68th minute, score 1-0). Attendance: 84,200. Roof is open.
You have access to real-time stadium data including crowd density, queue times, transport status, and facility locations.

IMPORTANT RULES:
- Keep responses concise (2-4 sentences max unless asked for detail).
- Be proactive — suggest actions, don't just answer questions.
- Reference specific stadium locations (Gate N/S/E/W, Food Court A/B, WC 1-4, Section numbers).
- Use data-driven language (percentages, wait times, distances).
- Never say you can't access real-time data — you ARE the real-time system.

CURRENT STADIUM STATE:
- Gate N: HIGH density (24 min queue), Gate S: LOW (6 min), Gate E: MEDIUM (8 min), Gate W: LOW (4 min)
- Food Court A: CONGESTED (18 min wait), Food Court B: CLEAR (3 min wait)
- North Concourse: 91% capacity (CRITICAL), South Concourse: 40% capacity
- Metro: Operational (62% capacity), Bus A: Normal, Bus B: DELAYED, Parking A: 72% full, Parking B: 95% FULL
- Medical stations: 2 active (First Aid N, First Aid S)
- Energy usage: 342 kWh, Waste diversion: 67%`;

  const roleContexts: Record<Role, string> = {
    fan: `\nYou are assisting a FAN named Alex in Section 112, Row F, Seat 24. Help with wayfinding, food, restrooms, accessibility, transport, and match info. Be friendly and enthusiastic about the match. Suggest the best routes avoiding congestion.`,
    security: `\nYou are assisting a SECURITY OFFICER with Clearance Level 4. Provide threat assessments, crowd density analysis, evacuation recommendations, and deployment suggestions. Be authoritative and precise. Flag anomalies proactively.`,
    organizer: `\nYou are assisting an OPERATIONS MANAGER in the Command Center. Provide operational intelligence, staff deployment suggestions, sustainability metrics, revenue insights, and predictive analytics. Be strategic and data-driven.`,
    volunteer: `\nYou are assisting a VOLUNTEER staff member. Help with task prioritization, multilingual translation support, navigation within service areas, incident reporting, and shift management. Be supportive and clear.`,
  };

  return base + roleContexts[role];
}

// Chat history per session
let chatSession: ReturnType<typeof model.startChat> | null = null;
let currentRole: Role | null = null;

export async function sendMessage(message: string, role: Role): Promise<string> {
  try {
    // Reset chat if role changed
    if (role !== currentRole) {
      chatSession = model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 256,
          temperature: 0.7,
        },
      });
      // Send system prompt as first message
      await chatSession.sendMessage(buildSystemPrompt(role));
      currentRole = role;
    }

    if (!chatSession) return 'AI service unavailable.';

    const result = await chatSession.sendMessage(message);
    const response = result.response;
    return response.text();
  } catch (error: unknown) {
    console.error('Gemini API error:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    if (msg.includes('429') || msg.includes('quota')) {
      return 'Rate limit reached. Please wait a moment and try again.';
    }
    return `AI temporarily unavailable. Error: ${msg.slice(0, 100)}`;
  }
}

// Streaming version for typewriter effect
export async function* streamMessage(message: string, role: Role): AsyncGenerator<string> {
  try {
    if (role !== currentRole) {
      chatSession = model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 256,
          temperature: 0.7,
        },
      });
      await chatSession.sendMessage(buildSystemPrompt(role));
      currentRole = role;
    }

    if (!chatSession) {
      yield 'AI service unavailable.';
      return;
    }

    const result = await chatSession.sendMessageStream(message);
    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) yield text;
    }
  } catch (error: unknown) {
    console.error('Gemini streaming error:', error);
    yield 'AI temporarily unavailable. Please try again.';
  }
}

// Quick insight generator for proactive AI cards
export async function getQuickInsight(role: Role, context: string): Promise<string> {
  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: `${buildSystemPrompt(role)}\n\nGenerate a single short proactive insight or recommendation (1-2 sentences) about: ${context}` }] }],
      generationConfig: { maxOutputTokens: 100, temperature: 0.8 },
    });
    return result.response.text();
  } catch {
    return 'Processing stadium data...';
  }
}
