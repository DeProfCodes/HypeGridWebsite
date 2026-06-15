import { httpClient } from '@/api/http/httpClient';
import { unwrapResult } from '@/api/http/unwrapResult';

// Public website API. Content GETs and the four conversion-form POSTs.
// Payloads use the backend's snake_case contract (see HypeGrid/docs/FRONTEND_INTEGRATION.md).
export const publicApi = {
  // ── Content ──────────────────────────────────────────────────────────────
  async getServices() {
    return unwrapResult(await httpClient.get('/api/public/services'));
  },
  async getPackages() {
    return unwrapResult(await httpClient.get('/api/public/packages'));
  },
  async getTestimonials() {
    return unwrapResult(await httpClient.get('/api/public/testimonials'));
  },
  async getCaseStudies() {
    return unwrapResult(await httpClient.get('/api/public/case-studies'));
  },
  async getSiteSettings() {
    return unwrapResult(await httpClient.get('/api/public/site-settings'));
  },

  // ── Marketing content ──────────────────────────────────────────────────────
  async getHeroPlacements() {
    return unwrapResult(await httpClient.get('/api/public/hero-placements'));
  },
  async getDeals(category) {
    const params = category && category !== 'All' ? { category } : undefined;
    return unwrapResult(await httpClient.get('/api/public/deals', { params }));
  },
  async getDeal(slug) {
    return unwrapResult(await httpClient.get(`/api/public/deals/${slug}`));
  },
  async getFeaturedVideo() {
    return unwrapResult(await httpClient.get('/api/public/featured-video'));
  },

  // Fire-and-forget analytics. Never throws — analytics must not break a page.
  async postAnalyticsEvent(event) {
    try {
      await httpClient.post('/api/public/analytics/events', event);
    } catch {
      /* swallow — anonymous, best-effort */
    }
    return null;
  },

  // ── Conversion forms ─────────────────────────────────────────────────────
  async submitContact(form) {
    const payload = {
      full_name: form.fullName,
      email: form.email,
      phone: form.phone || null,
      subject: form.subject || null,
      interest: form.interest || null,
      message: form.message,
      source_page: form.sourcePage || 'contact',
    };
    return unwrapResult(await httpClient.post('/api/public/contact', payload));
  },

  async submitCampaignRequest(form) {
    const payload = {
      full_name: form.fullName,
      brand_name: form.brandName || null,
      email: form.email,
      phone: form.phone || null,
      promote_what: form.promoteWhat || null,
      campaign_type: form.campaignType || null,
      target_audience: form.targetAudience || null,
      platforms: Array.isArray(form.platforms) ? form.platforms : [],
      budget: form.budget || null,
      goal: form.goal || null,
      message: form.message || null,
    };
    return unwrapResult(await httpClient.post('/api/public/campaign-requests', payload));
  },

  async submitCreatorApplication(form) {
    const payload = {
      full_name: form.fullName,
      email: form.email,
      phone: form.phone || null,
      city: form.city || null,
      province: form.province || null,
      platform: form.platform || null,
      handle: form.handle || null,
      followers: form.followers || null,
      niche: form.niche || null,
      why: form.why || null,
    };
    return unwrapResult(await httpClient.post('/api/public/creator-applications', payload));
  },

  async subscribeNewsletter(form) {
    const payload = {
      email: form.email,
      full_name: form.fullName || null,
      source_page: form.sourcePage || null,
    };
    return unwrapResult(await httpClient.post('/api/public/newsletter/subscribe', payload));
  },

  // ── HypeGrid Alerts / Deals Club (consent-based opt-in) ──────────────────
  // Returns { id, whatsapp_channel_url } on success.
  async subscribeAlerts(form) {
    const payload = {
      full_name: form.fullName || null,
      email: form.email || null,
      phone: form.phone || null,
      city: form.city || null,
      province: form.province || null,
      interests: Array.isArray(form.interests) ? form.interests : [],
      frequency_preference: form.frequencyPreference || null,
      source_page: form.sourcePage || 'alerts',
      consent: form.consent === true,
      consent_version: form.consentVersion || null,
      consent_snapshot: form.consentSnapshot || null,
    };
    return unwrapResult(await httpClient.post('/api/public/alerts/subscribe', payload));
  },

  // Records that the subscriber tapped the WhatsApp Channel CTA. Returns
  // { whatsapp_channel_url }. Never throws — the UI must still open the channel.
  async markAlertChannelClick(id) {
    try {
      return unwrapResult(await httpClient.post(`/api/public/alerts/${id}/channel-click`, {}));
    } catch {
      return null;
    }
  },
};
