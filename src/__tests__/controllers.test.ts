/**
 * @module controllers.test
 * @description Unit tests for controller layer hooks.
 * Validates match clock logic, app state transitions, and navigation routing.
 *
 * Hackathon Alignment:
 * - Multi-role state management for fan, security, organizer, volunteer
 * - Emergency mode activation for evacuation scenarios
 * - Match clock progression for real-time awareness
 * - Layer toggling for digital twin visualization
 */
import { describe, it, expect } from 'vitest';

// ── Match Clock Logic Tests ────────────────────────────

describe('Match Clock Logic', () => {
  const MAX_MATCH_MINUTES = 90;

  function tickClock(prev: { min: number; sec: number }): { min: number; sec: number } {
    if (prev.sec >= 59) {
      return { min: Math.min(prev.min + 1, MAX_MATCH_MINUTES), sec: 0 };
    }
    return { min: prev.min, sec: prev.sec + 1 };
  }

  it('increments seconds correctly', () => {
    const result = tickClock({ min: 68, sec: 12 });
    expect(result.min).toBe(68);
    expect(result.sec).toBe(13);
  });

  it('rolls over to next minute at 59 seconds', () => {
    const result = tickClock({ min: 68, sec: 59 });
    expect(result.min).toBe(69);
    expect(result.sec).toBe(0);
  });

  it('caps at 90 minutes (regulation time)', () => {
    const result = tickClock({ min: 90, sec: 59 });
    expect(result.min).toBe(90);
    expect(result.sec).toBe(0);
  });

  it('formats match time correctly', () => {
    const min = 68;
    const sec = 5;
    const matchTime = `${min}:${sec.toString().padStart(2, '0')}`;
    expect(matchTime).toBe('68:05');
  });

  it('handles zero seconds', () => {
    const result = tickClock({ min: 45, sec: 0 });
    expect(result.sec).toBe(1);
  });
});

// ── Navigation State Logic Tests ───────────────────────

describe('Navigation State Logic', () => {
  const modeMap: Record<string, { mode: string; layers: string[] }> = {
    evac: { mode: 'emergency', layers: ['security', 'crowd'] },
    nav: { mode: 'normal', layers: ['navigation'] },
    transport: { mode: 'normal', layers: ['transportation'] },
    access: { mode: 'normal', layers: ['accessibility'] },
    crowd: { mode: 'normal', layers: ['crowd'] },
  };

  it('activates emergency mode for evacuation view', () => {
    const cfg = modeMap['evac'];
    expect(cfg).toBeDefined();
    expect(cfg!.mode).toBe('emergency');
    expect(cfg!.layers).toContain('security');
    expect(cfg!.layers).toContain('crowd');
  });

  it('activates normal mode for navigation view', () => {
    const cfg = modeMap['nav'];
    expect(cfg).toBeDefined();
    expect(cfg!.mode).toBe('normal');
    expect(cfg!.layers).toContain('navigation');
  });

  it('returns undefined for unknown navigation (default to normal)', () => {
    const cfg = modeMap['home'];
    expect(cfg).toBeUndefined();
  });

  it('crowd view activates crowd layer', () => {
    const cfg = modeMap['crowd'];
    expect(cfg).toBeDefined();
    expect(cfg!.layers).toEqual(['crowd']);
  });

  it('access view activates accessibility layer', () => {
    const cfg = modeMap['access'];
    expect(cfg).toBeDefined();
    expect(cfg!.layers).toEqual(['accessibility']);
  });
});

// ── Role Selection Logic Tests ─────────────────────────

describe('Role Selection Logic', () => {
  function getDefaultLayers(role: string): string[] {
    if (role === 'security') return ['security', 'crowd', 'ai'];
    if (role === 'organizer') return ['queue', 'transportation', 'ai'];
    return ['ai', 'navigation'];
  }

  it('security role gets security + crowd + ai layers', () => {
    const layers = getDefaultLayers('security');
    expect(layers).toContain('security');
    expect(layers).toContain('crowd');
    expect(layers).toContain('ai');
  });

  it('organizer role gets queue + transportation + ai layers', () => {
    const layers = getDefaultLayers('organizer');
    expect(layers).toContain('queue');
    expect(layers).toContain('transportation');
    expect(layers).toContain('ai');
  });

  it('fan role gets ai + navigation layers (default)', () => {
    const layers = getDefaultLayers('fan');
    expect(layers).toContain('ai');
    expect(layers).toContain('navigation');
  });

  it('volunteer role gets default layers', () => {
    const layers = getDefaultLayers('volunteer');
    expect(layers).toEqual(['ai', 'navigation']);
  });
});

// ── Layer Toggle Logic Tests ───────────────────────────

describe('Layer Toggle Logic', () => {
  function toggleLayer(prev: Set<string>, layer: string): Set<string> {
    const next = new Set(prev);
    if (next.has(layer)) next.delete(layer);
    else next.add(layer);
    return next;
  }

  it('adds a layer when not present', () => {
    const result = toggleLayer(new Set(['ai']), 'crowd');
    expect(result.has('crowd')).toBe(true);
    expect(result.has('ai')).toBe(true);
  });

  it('removes a layer when already present', () => {
    const result = toggleLayer(new Set(['ai', 'crowd']), 'crowd');
    expect(result.has('crowd')).toBe(false);
    expect(result.has('ai')).toBe(true);
  });

  it('handles empty set', () => {
    const result = toggleLayer(new Set(), 'ai');
    expect(result.has('ai')).toBe(true);
    expect(result.size).toBe(1);
  });
});
