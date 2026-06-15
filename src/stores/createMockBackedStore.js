import { create } from 'zustand';
import { STORE_CONFIG } from './config';

/**
 * Factory for "mock-backed" Zustand stores. Pages/components call store hooks
 * only and never import mock data directly. Each slice declares how to load in
 * BOTH mock and live mode; the store owns the decision via STORE_CONFIG.
 *
 * Per slice "items" the store exposes:
 *   state.items, state.itemsLoading, state.itemsError, state.fetchItems()
 *
 * `fallbackToMock: true` on a slice makes a live-API failure fall back to the
 * mock provider instead of erroring — used for public display content so the
 * website never renders empty when the API is offline.
 */
export function createMockBackedStore({ slices }) {
  return create((set) => {
    const initialState = {};
    const actions = {};

    for (const [name, slice] of Object.entries(slices)) {
      const loadingKey = `${name}Loading`;
      const errorKey = `${name}Error`;
      const fetcherName = `fetch${name.charAt(0).toUpperCase()}${name.slice(1)}`;

      initialState[name] = slice.initial !== undefined ? slice.initial : null;
      initialState[loadingKey] = false;
      initialState[errorKey] = null;

      actions[fetcherName] = async (...args) => {
        set({ [loadingKey]: true, [errorKey]: null });
        const useMock = STORE_CONFIG.getMockMode();

        const runMock = async () => {
          if (typeof slice.mock !== 'function') {
            throw new Error(`Mock provider for "${name}" is not a function.`);
          }
          return slice.mock(...args);
        };

        try {
          if (useMock) {
            const data = await runMock();
            set({ [name]: data, [loadingKey]: false });
            return data;
          }
          if (typeof slice.api !== 'function') {
            set({ [errorKey]: `API not implemented for "${name}".`, [loadingKey]: false });
            return null;
          }
          const data = await slice.api(...args);
          set({ [name]: data, [loadingKey]: false });
          return data;
        } catch (error) {
          if (!useMock && slice.fallbackToMock) {
            try {
              const data = await runMock();
              console.warn(`[Store] "${name}" API failed; serving mock fallback.`, error?.message);
              set({ [name]: data, [loadingKey]: false, [errorKey]: null });
              return data;
            } catch (mockError) {
              console.error(`[Store] "${name}" mock fallback failed:`, mockError);
            }
          }
          console.error(`[Store] Failed to fetch "${name}":`, error);
          set({ [errorKey]: error?.message || 'Fetch failed', [loadingKey]: false });
          return null;
        }
      };
    }

    return { ...initialState, ...actions };
  });
}
