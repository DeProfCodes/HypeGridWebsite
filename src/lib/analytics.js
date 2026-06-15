import { publicApi } from '@/api/publicApi';

// HypeGrid-owned, anonymous analytics. Fire-and-forget: every call is wrapped so
// a failure (offline API, blocked request) can NEVER break the page. No personal
// data is collected — only an anonymous session id stored locally.

const SESSION_KEY = 'hg_session_id';

function getSessionId() {
  try {
    let id = window.localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = `s_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
      window.localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}

/**
 * Record an analytics event. Safe to call anywhere; never throws.
 * @param {string} eventType  e.g. 'impression' | 'cta_click' | 'card_click'
 * @param {{ entityType?: string, entityId?: string|null }} [opts]
 */
export function track(eventType, { entityType = 'Other', entityId = null } = {}) {
  try {
    publicApi.postAnalyticsEvent({
      event_type: eventType,
      entity_type: entityType,
      entity_id: entityId,
      page_path: typeof window !== 'undefined' ? window.location.pathname : null,
      referrer: typeof document !== 'undefined' ? document.referrer || null : null,
      session_id: getSessionId(),
    });
  } catch {
    /* analytics must never break the page */
  }
}

// Per-session impression de-dupe (e.g. "hero impression once per slide").
const seen = new Set();

export function trackImpressionOnce(key, eventType, opts) {
  if (seen.has(key)) return;
  seen.add(key);
  track(eventType, opts);
}
