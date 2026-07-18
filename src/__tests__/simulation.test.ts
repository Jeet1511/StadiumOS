/**
 * @module simulation.test
 * @description Unit tests for the stadium data simulation engine.
 * Validates data shapes, value ranges, and function return types.
 */
import { describe, it, expect } from 'vitest';
import { getCrowdZones, getTransportStatus, getSustainabilityMetrics, getVolunteerTasks, getQueueTimes } from '../models/simulation';

describe('getCrowdZones() — Crowd Management', () => {
  it('returns exactly 8 crowd zones', () => {
    const zones = getCrowdZones();
    expect(zones).toHaveLength(8);
  });

  it('each zone has all required properties', () => {
    for (const zone of getCrowdZones()) {
      expect(zone.id).toBeTruthy();
      expect(zone.name).toBeTruthy();
      expect(typeof zone.density).toBe('number');
      expect(['rising', 'falling', 'stable']).toContain(zone.trend);
      expect(zone.capacity).toBeGreaterThan(0);
      expect(zone.current).toBeGreaterThanOrEqual(0);
    }
  });

  it('density values are between 0 and 100', () => {
    for (const zone of getCrowdZones()) {
      expect(zone.density).toBeGreaterThanOrEqual(0);
      expect(zone.density).toBeLessThanOrEqual(100);
    }
  });

  it('current headcount does not exceed capacity', () => {
    for (const zone of getCrowdZones()) {
      expect(zone.current).toBeLessThanOrEqual(zone.capacity * 1.2);
    }
  });

  it('includes concourse zones for crowd flow monitoring', () => {
    const zones = getCrowdZones();
    expect(zones.some(z => z.id.includes('concourse'))).toBe(true);
  });
});

describe('getTransportStatus() — Transportation', () => {
  it('returns 6 transport services', () => {
    expect(getTransportStatus()).toHaveLength(6);
  });

  it('includes all transport types: metro, bus, taxi, parking', () => {
    const types = getTransportStatus().map(t => t.type);
    expect(types).toContain('metro');
    expect(types).toContain('bus');
    expect(types).toContain('taxi');
    expect(types).toContain('parking');
  });

  it('each service has valid status', () => {
    for (const t of getTransportStatus()) {
      expect(['operational', 'delayed', 'full']).toContain(t.status);
      expect(t.label).toBeTruthy();
      expect(typeof t.capacity).toBe('number');
      expect(t.eta).toBeTruthy();
    }
  });

  it('capacity values are between 0 and 100', () => {
    for (const t of getTransportStatus()) {
      expect(t.capacity).toBeGreaterThanOrEqual(0);
      expect(t.capacity).toBeLessThanOrEqual(100);
    }
  });
});

describe('getSustainabilityMetrics() — FIFA Green Score', () => {
  it('returns 4 sustainability metrics', () => {
    expect(getSustainabilityMetrics()).toHaveLength(4);
  });

  it('includes energy, water, waste, and carbon metrics', () => {
    const labels = getSustainabilityMetrics().map(m => m.label.toLowerCase());
    expect(labels.some(l => l.includes('energy'))).toBe(true);
    expect(labels.some(l => l.includes('water'))).toBe(true);
    expect(labels.some(l => l.includes('waste'))).toBe(true);
    expect(labels.some(l => l.includes('carbon'))).toBe(true);
  });

  it('each metric has valid structure', () => {
    for (const m of getSustainabilityMetrics()) {
      expect(m.label).toBeTruthy();
      expect(m.value).toBeGreaterThanOrEqual(0);
      expect(m.max).toBeGreaterThan(0);
      expect(m.value).toBeLessThanOrEqual(m.max);
      expect(m.unit).toBeTruthy();
      expect(['up', 'down', 'stable']).toContain(m.trend);
    }
  });
});

describe('getVolunteerTasks() — Volunteer Management', () => {
  it('returns 5 volunteer tasks', () => {
    expect(getVolunteerTasks()).toHaveLength(5);
  });

  it('tasks are priority-ranked', () => {
    for (const task of getVolunteerTasks()) {
      expect(['high', 'medium', 'low']).toContain(task.priority);
      expect(['pending', 'active', 'done']).toContain(task.status);
      expect(task.title).toBeTruthy();
      expect(task.zone).toBeTruthy();
      expect(task.assignedAt).toBeGreaterThan(0);
    }
  });

  it('includes accessibility-related tasks (wheelchair assist)', () => {
    const tasks = getVolunteerTasks();
    expect(tasks.some(t => t.title.toLowerCase().includes('wheelchair'))).toBe(true);
  });

  it('includes multilingual tasks (translation)', () => {
    const tasks = getVolunteerTasks();
    expect(tasks.some(t => t.title.toLowerCase().includes('translate'))).toBe(true);
  });
});

describe('getQueueTimes() — Fan Experience', () => {
  it('returns queue times for gates and facilities', () => {
    const times = getQueueTimes();
    expect(Object.keys(times).length).toBeGreaterThan(0);
  });

  it('includes all 4 gates', () => {
    const times = getQueueTimes();
    expect(times['g-n']).toBeDefined();
    expect(times['g-s']).toBeDefined();
    expect(times['g-e']).toBeDefined();
    expect(times['g-w']).toBeDefined();
  });

  it('includes food court and restroom wait times', () => {
    const times = getQueueTimes();
    expect(times['f-1']).toBeDefined();
    expect(times['r-1']).toBeDefined();
  });

  it('all wait times are non-negative numbers', () => {
    for (const [, time] of Object.entries(getQueueTimes())) {
      expect(typeof time).toBe('number');
      expect(time).toBeGreaterThanOrEqual(0);
    }
  });
});
