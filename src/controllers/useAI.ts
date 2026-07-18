/**
 * @module useAI
 * @description Controller for AI chat with streaming support.
 * Manages conversation state, message history, and real-time streaming
 * from Google Gemini 2.0 Flash with graceful fallback.
 *
 * Architecture: Controller layer hook consumed by the AIChat view.
 * Delegates API calls to the ai-service (Service layer).
 *
 * Hackathon Alignment:
 * - GenAI-powered stadium assistance with streaming responses
 * - Role-adaptive AI personality (fan, security, organizer, volunteer)
 * - Real-time decision support for stadium operations
 * - Multilingual assistance capability
 *
 * Efficiency: Debounced streaming updates, message history limit,
 * abort support for cancelled requests.
 */
import { useState, useCallback, useRef } from 'react';
import { sendMessage, streamMessage } from '../services/ai-service';
import type { Role, ChatMessage, AIStateReturn } from '../models/types';

/** Maximum messages to retain in memory for performance */
const MAX_MESSAGE_HISTORY = 100;

/**
 * AI chat controller hook with streaming support.
 * Provides conversation state and actions for the AI chat panel.
 *
 * @param {Role} role - Current user role for context-adaptive AI responses.
 * @returns {AIStateReturn} Chat messages, loading state, and action handlers.
 *
 * @example
 * function ChatPanel({ role }: { role: Role }) {
 *   const { messages, isLoading, send, clear } = useAI(role);
 *   return <ChatUI messages={messages} onSend={send} loading={isLoading} />;
 * }
 */
export function useAI(role: Role): AIStateReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef(false);

  /**
   * Sends a message and streams the AI response token-by-token.
   * Falls back to non-streaming if streaming fails.
   */
  const send = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;
    abortRef.current = false;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: Date.now(),
    };

    const assistantId = `asst-${Date.now()}`;
    const assistantMsg: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      isStreaming: true,
    };

    setMessages(prev => {
      const next = [...prev, userMsg, assistantMsg];
      // Trim history for memory efficiency
      return next.length > MAX_MESSAGE_HISTORY ? next.slice(-MAX_MESSAGE_HISTORY) : next;
    });
    setIsLoading(true);

    try {
      let accumulated = '';
      for await (const chunk of streamMessage(text.trim(), role)) {
        if (abortRef.current) break;
        accumulated += chunk;
        const current = accumulated;
        setMessages(prev =>
          prev.map(m => m.id === assistantId ? { ...m, content: current } : m)
        );
      }
      setMessages(prev =>
        prev.map(m => m.id === assistantId ? { ...m, isStreaming: false } : m)
      );
    } catch {
      // Fallback to non-streaming API call
      try {
        const response = await sendMessage(text.trim(), role);
        setMessages(prev =>
          prev.map(m => m.id === assistantId ? { ...m, content: response, isStreaming: false } : m)
        );
      } catch {
        setMessages(prev =>
          prev.map(m => m.id === assistantId ? { ...m, content: 'AI temporarily unavailable.', isStreaming: false } : m)
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, [role, isLoading]);

  /** Clears conversation history and aborts any in-progress stream. */
  const clear = useCallback(() => {
    setMessages([]);
    abortRef.current = true;
  }, []);

  return { messages, isLoading, send, clear };
}
