import { Music } from 'lucide-react';

// Canonical website packages. Extracted verbatim from the original Packages.jsx.
// `cta`, `color`, `icon`, `featured` are presentation kept in the frontend; the
// backend Package entity stores name/description/features/is_featured, so live
// API items are merged with this list by name.
export const packagesMock = [
  {
    name: 'Starter Hype',
    description: 'For small campaigns, basic visibility, and first-time promotion.',
    includes: ['Campaign concept', '3–5 social creatives', 'Captions', 'Basic posting plan', 'Light promotional push'],
    cta: 'Request Starter Campaign',
    color: 'cyan',
  },
  {
    name: 'Growth Hype',
    description: 'For businesses, artists, or events ready to build stronger awareness.',
    includes: ['Campaign strategy', 'Content pack', 'Reels/short video direction', 'Influencer/creator options', 'Multi-platform promotion', 'Performance summary'],
    cta: 'Request Growth Campaign',
    color: 'green',
    featured: true,
  },
  {
    name: 'Premium Launch',
    description: 'For serious launches, events, products, songs, or brands.',
    includes: ['Full campaign planning', 'Launch countdown', 'Creator/influencer activation', 'Paid traffic setup', 'Branded content assets', 'Campaign reporting'],
    cta: 'Build My Launch',
    color: 'cyan',
  },
  {
    name: 'Monthly Brand Management',
    description: 'For clients who need ongoing social media presence.',
    includes: ['Content calendar', 'Post designs', 'Captions', 'Reels planning', 'Page management', 'Monthly reporting'],
    cta: 'Manage My Brand',
    color: 'green',
  },
  {
    name: 'Music Release Push',
    description: 'For artists and musicians.',
    includes: ['Release-week campaign', 'Song snippet content', 'TikTok/Reels concept', 'Creator challenge idea', 'Fan engagement captions', 'Streaming CTA'],
    cta: 'Promote My Song',
    color: 'cyan',
    icon: Music,
  },
];

// Merge live API packages (snake_case: name, description, features, is_featured)
// with the presentation map (matched by name).
export function decoratePackages(apiItems) {
  if (!Array.isArray(apiItems) || apiItems.length === 0) return packagesMock;
  return apiItems.map((item) => {
    const preset = packagesMock.find((m) => m.name === item.name);
    return {
      name: item.name,
      description: item.description || preset?.description || '',
      includes: Array.isArray(item.features) && item.features.length ? item.features : preset?.includes ?? [],
      cta: preset?.cta ?? 'Start a Campaign',
      color: preset?.color ?? 'cyan',
      featured: typeof item.is_featured === 'boolean' ? item.is_featured : preset?.featured ?? false,
      icon: preset?.icon,
    };
  });
}
