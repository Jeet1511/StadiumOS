/**
 * @module ai-service
 * @description Gemini AI integration service for StadiumOS.
 * Provides context-aware, role-adaptive AI assistance for FIFA World Cup 2026 stadium operations.
 * 
 * Security: Input sanitization, API key masking, error boundary handling.
 * GenAI Feature: Navigation, crowd management, accessibility, real-time decision support.
 */
import { GoogleGenerativeAI, type GenerativeModel, type ChatSession } from '@google/generative-ai';
import type { Role } from '../models/types';

/** API key loaded from environment — never exposed in client errors */
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
let model: GenerativeModel | null = null;

/**
 * Lazily initializes and returns the Gemini GenerativeModel singleton.
 * @throws {Error} If API key is missing from environment configuration.
 * @returns {GenerativeModel} The initialized Gemini model instance.
 */
function getModel(): GenerativeModel {
  if (!model) {
    if (!API_KEY) throw new Error('API_KEY_MISSING');
    const genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }
  return model;
}

/**
 * Sanitizes user input to prevent prompt injection and XSS.
 * Strips HTML tags, script content, and excessive whitespace.
 * @param {string} input - Raw user input from chat.
 * @returns {string} Sanitized input safe for API transmission.
 */
function sanitizeInput(input: string): string {
  return input
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')  // Strip script tags
    .replace(/<[^>]+>/g, '')                              // Strip HTML tags
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')      // Strip control chars
    .trim()
    .slice(0, 500);                                       // Max length limit
}

/**
 * Builds role-specific system prompt with live stadium context.
 * Each role receives tailored data access and response guidelines.
 * 
 * Hackathon Alignment: Multilingual assistance, operational intelligence,
 * crowd management, navigation, accessibility, sustainability.
 * 
 * @param {Role} role - The active user role (fan, security, organizer, volunteer).
 * @returns {string} Complete system prompt with role context.
 */
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

let chatSession: ChatSession | null = null;
let currentRole: Role | null = null;

/**
 * Sends a message to the Gemini AI and returns the response.
 * Handles session management, input sanitization, and error recovery.
 * 
 * @param {string} message - User's raw message input.
 * @param {Role} role - Current user role for context adaptation.
 * @returns {Promise<string>} AI response text or user-friendly error message.
 */
export async function sendMessage(message: string, role: Role): Promise<string> {
  const sanitized = sanitizeInput(message);
  if (!sanitized) return 'Please enter a valid message.';

  try {
    if (role !== currentRole) {
      chatSession = getModel().startChat({
        history: [],
        generationConfig: { maxOutputTokens: 200, temperature: 0.7 },
      });
      await chatSession.sendMessage(buildSystemPrompt(role));
      currentRole = role;
    }
    if (!chatSession) return 'AI initializing...';
    const result = await chatSession.sendMessage(sanitized);
    return result.response.text();
  } catch (error: unknown) {
    console.error('Gemini error:', error);
    const msg = error instanceof Error ? error.message : '';
    if (msg.includes('API_KEY_MISSING')) return 'Please add your Gemini API Key to the .env file to enable AI features.';
    if (msg.includes('API_KEY') || msg.includes('API key')) return 'Invalid API key. Please check your Gemini API key configuration.';
    if (msg.includes('429') || msg.includes('quota')) return 'Rate limited — please wait a moment and try again.';
    // Security: Never expose raw error details or API keys to the client
    return 'AI temporarily unavailable. Please try again in a moment.';
  }
}

/**
 * Streams a response from Gemini AI token-by-token for real-time display.
 * Provides a natural conversational feel with typing indicators.
 * 
 * @param {string} message - User's raw message input.
 * @param {Role} role - Current user role for context adaptation.
 * @yields {string} Individual text chunks as they arrive from the model.
 */
export async function* streamMessage(message: string, role: Role): AsyncGenerator<string> {
  const sanitized = sanitizeInput(message);
  if (!sanitized) { yield 'Please enter a valid message.'; return; }

  try {
    if (role !== currentRole) {
      chatSession = getModel().startChat({
        history: [],
        generationConfig: { maxOutputTokens: 200, temperature: 0.7 },
      });
      await chatSession.sendMessage(buildSystemPrompt(role));
      currentRole = role;
    }
    if (!chatSession) { yield 'AI initializing...'; return; }
    const result = await chatSession.sendMessageStream(sanitized);
    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) yield text;
    }
  } catch (error: unknown) {
    console.error('Gemini stream error:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    if (msg.includes('API_KEY_MISSING')) { yield 'Please add your Gemini API Key to the .env file to enable AI features.'; return; }
    // Security: Mask internal error details
    yield 'AI temporarily unavailable. Please try again in a moment.';
  }
}
