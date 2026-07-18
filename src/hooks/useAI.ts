import { useState, useCallback, useRef } from 'react';
import { sendMessage, streamMessage } from '../services/ai-service';
import type { Role, ChatMessage } from '../types';

export function useAI(role: Role) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef(false);

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

    setMessages(prev => [...prev, userMsg, assistantMsg]);
    setIsLoading(true);

    try {
      let accumulated = '';
      for await (const chunk of streamMessage(text.trim(), role)) {
        if (abortRef.current) break;
        accumulated += chunk;
        setMessages(prev =>
          prev.map(m => m.id === assistantId ? { ...m, content: accumulated } : m)
        );
      }
      // Mark streaming done
      setMessages(prev =>
        prev.map(m => m.id === assistantId ? { ...m, isStreaming: false } : m)
      );
    } catch {
      // Fallback to non-streaming
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

  const clear = useCallback(() => {
    setMessages([]);
    abortRef.current = true;
  }, []);

  return { messages, isLoading, send, clear };
}
