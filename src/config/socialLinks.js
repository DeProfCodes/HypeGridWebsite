// Single source of truth for HypeGrid social links. If a handle/URL changes
// (e.g. the Facebook page if it doesn't resolve), update it HERE only — every
// footer/section reads from this file, so nothing is hardcoded in many places.
export const whatsappChannel = 'https://whatsapp.com/channel/0029VbCla7vEQIaqrNnT1E2e';
export const youtube = 'https://www.youtube.com/@hype.grid.r';
export const tiktok = 'https://www.tiktok.com/@hype.grid.r';
export const instagram = 'https://www.instagram.com/hypegrid.r/';
// NOTE: confirm this resolves in production; change here if the page handle differs.
export const facebook = 'https://www.facebook.com/hype.grid.rr';

export const socialLinks = { whatsappChannel, youtube, tiktok, instagram, facebook };

// Render order + brand colours (used by the colourful variant and footer hover).
export const SOCIALS = [
  { key: 'whatsappChannel', label: 'WhatsApp Channel', href: whatsappChannel, color: '#25D366' },
  { key: 'youtube', label: 'YouTube', href: youtube, color: '#FF0000' },
  { key: 'tiktok', label: 'TikTok', href: tiktok, color: '#25F4EE' },
  { key: 'instagram', label: 'Instagram', href: instagram, color: '#E4405F' },
  { key: 'facebook', label: 'Facebook', href: facebook, color: '#1877F2' },
];
