import { Building2, Music, Users, Rocket, CalendarDays, BarChart3, Palette, Target } from 'lucide-react';

// Canonical website services. Extracted verbatim from the original
// Services.jsx so the page renders identically whether content comes from
// here (mock mode / API offline) or the live API (decorated below).
//
// `icon` and `color` are PRESENTATION and stay in the frontend — the backend
// Service entity only stores title/slug/includes, so live API items are merged
// with this list by title to retain the icon + accent colour + description.
export const servicesMock = [
  {
    icon: Building2,
    title: 'Business Promotion',
    description: 'For businesses, shops, salons, restaurants, real estate agents, service providers, e-commerce stores, and local brands that need visibility.',
    includes: ['Promotional content', 'Social media posts', 'Reels/TikTok ideas', 'Campaign messaging', 'WhatsApp traffic campaigns', 'Brand awareness push'],
    color: 'cyan',
  },
  {
    icon: Music,
    title: 'Music & Artist Promotion',
    description: 'For artists, DJs, producers, and performers who want to push songs, releases, music videos, events, and personal brands.',
    includes: ['Song release campaign', 'TikTok/Reels sound push', 'Snippet content', 'Cover art motion graphics', 'Fan engagement captions', 'Streaming CTA'],
    color: 'green',
  },
  {
    icon: Users,
    title: 'Influencer & Creator Campaigns',
    description: 'We activate creators, micro-influencers, promoters, and digital voices to help brands reach real audiences.',
    includes: ['Creator campaign brief', 'Influencer selection', 'Campaign content direction', 'Creator posting', 'Performance summary'],
    color: 'cyan',
  },
  {
    icon: Rocket,
    title: 'Launch Campaigns',
    description: 'For new brands, apps, products, websites, and services that need a powerful launch push.',
    includes: ['Teaser campaign', 'Launch countdown', 'Launch-day push', 'Content pack', 'Creator/influencer activation', 'Post-launch momentum'],
    color: 'green',
  },
  {
    icon: CalendarDays,
    title: 'Event Promotion',
    description: 'For concerts, parties, festivals, pop-ups, business events, conferences, workshops, and community events.',
    includes: ['Event posters', 'Promo videos', 'Countdown content', 'Influencer invitations', 'Ticket CTA campaigns', 'Recap content'],
    color: 'cyan',
  },
  {
    icon: BarChart3,
    title: 'Social Media Management',
    description: 'For clients who need ongoing social media presence.',
    includes: ['Content calendar', 'Page management', 'Captions', 'Post designs', 'Reels planning', 'Engagement support', 'Monthly reporting'],
    color: 'green',
  },
  {
    icon: Palette,
    title: 'Content Creation',
    description: 'For brands that need high-quality digital assets.',
    includes: ['Promo videos', 'Reels', 'Flyers', 'Motion graphics', 'Campaign visuals', 'Captions', 'Digital content kits'],
    color: 'cyan',
  },
  {
    icon: Target,
    title: 'Paid Traffic Campaigns',
    description: 'For brands that need traffic, leads, awareness, or conversions.',
    includes: ['Facebook ads', 'Instagram ads', 'TikTok ads', 'Google ads', 'WhatsApp click campaigns', 'Lead campaigns'],
    color: 'cyan',
  },
];

// Merge live API services (snake_case: title, includes, short_description, …)
// with the presentation map above (matched by title). API fields win for
// content; the frontend supplies icon/color/description fallbacks.
export function decorateServices(apiItems) {
  if (!Array.isArray(apiItems) || apiItems.length === 0) return servicesMock;
  return apiItems.map((item) => {
    const preset = servicesMock.find((m) => m.title === item.title);
    return {
      icon: preset?.icon ?? Target,
      color: preset?.color ?? 'cyan',
      title: item.title,
      description: item.short_description || item.full_description || preset?.description || '',
      includes: Array.isArray(item.includes) && item.includes.length ? item.includes : preset?.includes ?? [],
    };
  });
}
