/**
 * @module constants.test
 * @description Unit tests for the Model layer configuration.
 * Validates role configs, navigation items, and POI definitions.
 */
import { describe, it, expect } from 'vitest';
import { ROLES, getRoleConfig, getNavItems, LAYERS, POIS } from '../models/constants';

describe('ROLES — Role Configuration', () => {
  it('defines exactly 4 roles', () => {
    expect(ROLES).toHaveLength(4);
  });

  it('includes all required roles: fan, security, organizer, volunteer', () => {
    const ids = ROLES.map(r => r.id);
    expect(ids).toContain('fan');
    expect(ids).toContain('security');
    expect(ids).toContain('organizer');
    expect(ids).toContain('volunteer');
  });

  it('each role has required properties', () => {
    for (const role of ROLES) {
      expect(role.id).toBeTruthy();
      expect(role.title).toBeTruthy();
      expect(role.subtitle).toBeTruthy();
      expect(role.desc).toBeTruthy();
      expect(role.icon).toBeDefined();
      expect(role.accent).toMatch(/^text-/);
      expect(role.accentHex).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });
});

describe('getRoleConfig()', () => {
  it('returns correct config for valid role', () => {
    expect(getRoleConfig('fan').id).toBe('fan');
    expect(getRoleConfig('security').title).toBe('Security Command');
  });

  it('returns fan config as fallback for unknown role', () => {
    expect(getRoleConfig('unknown').id).toBe('fan');
  });
});

describe('getNavItems()', () => {
  it('returns navigation items for fan role', () => {
    const items = getNavItems('fan');
    expect(items.length).toBeGreaterThan(0);
    expect(items[0]!.id).toBe('home');
  });

  it('every nav item has id, icon, and label', () => {
    const items = getNavItems('fan');
    for (const item of items) {
      expect(item.id).toBeTruthy();
      expect(item.icon).toBeDefined();
      expect(item.label).toBeTruthy();
    }
  });

  it('includes AI assistant navigation', () => {
    const items = getNavItems('fan');
    const aiItem = items.find(i => i.id === 'ai');
    expect(aiItem).toBeDefined();
    expect(aiItem?.highlight).toBe(true);
  });
});

describe('LAYERS — Map Layer Definitions', () => {
  it('defines at least 3 map layers', () => {
    expect(LAYERS.length).toBeGreaterThanOrEqual(3);
  });

  it('includes crowd density layer (core hackathon requirement)', () => {
    const crowd = LAYERS.find(l => l.id === 'crowd');
    expect(crowd).toBeDefined();
    expect(crowd?.label).toContain('Crowd');
  });
});

describe('POIS — Points of Interest', () => {
  it('defines stadium facilities', () => {
    expect(POIS.length).toBeGreaterThan(0);
  });

  it('includes all gate positions', () => {
    const gates = POIS.filter(p => p.type === 'Gate');
    expect(gates.length).toBeGreaterThanOrEqual(4);
  });

  it('includes medical and accessible facilities', () => {
    expect(POIS.some(p => p.type === 'Medical')).toBe(true);
    expect(POIS.some(p => p.type === 'Accessible')).toBe(true);
  });

  it('all POIs have valid coordinates', () => {
    for (const poi of POIS) {
      expect(poi.x).toBeGreaterThan(0);
      expect(poi.y).toBeGreaterThan(0);
    }
  });
});
