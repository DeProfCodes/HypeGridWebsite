// Central runtime config. The API base URL is ALWAYS env-driven — never
// hardcode it in components. Set VITE_HYPEGRID_API_BASE_URL in .env (see
// .env.example). Falls back to localhost only for first-run local dev.
export const env = {
  apiBaseUrl:
    import.meta.env.VITE_HYPEGRID_API_BASE_URL ||
    (typeof window !== 'undefined' && window.location.hostname === 'localhost'
      ? 'http://localhost:5249'
      : ''),

  // Force mock mode for public display content (services/packages/etc.).
  // Forms always submit to the real API regardless of this flag.
  useMocks: import.meta.env.VITE_HYPEGRID_USE_MOCKS === 'true',

  enableApiLogging:
    import.meta.env.VITE_ENABLE_API_LOGGING === 'true' || import.meta.env.DEV,
};
