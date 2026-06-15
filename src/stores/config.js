// Global store configuration — tracks whether display content should come from
// mock data or the live API, and lets Zustand stores react to a flip.
// Listeners fire ONLY on an actual change (idempotent).
import { env } from '@/app/config/env';

let listeners = [];

export const STORE_CONFIG = {
  // Default to the env flag. The website has no login, so this is the only
  // knob: VITE_HYPEGRID_USE_MOCKS=true forces mock display content.
  useMockData: env.useMocks === true,

  setMockMode: (nextValue) => {
    const next = Boolean(nextValue);
    if (STORE_CONFIG.useMockData === next) return;
    STORE_CONFIG.useMockData = next;
    listeners.forEach((l) => l(next));
  },

  getMockMode: () => STORE_CONFIG.useMockData,

  subscribe: (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
};
