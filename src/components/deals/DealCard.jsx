import React from 'react';
import { motion } from 'framer-motion';
import { Tag, MapPin, ArrowUpRight } from 'lucide-react';
import { track } from '@/lib/analytics';

const fmtPrice = (v) => (v == null ? null : `R${Number(v).toLocaleString()}`);
const fmtDate = (v) => (v ? String(v).slice(0, 10) : null);

// A single deal/special card. Third-party deals are shown neutrally
// ("Special found at …") unless explicitly marked sponsored.
export default function DealCard({ deal, index = 0 }) {
  const onClick = () => track('card_click', { entityType: 'Deal', entityId: deal.id });
  const original = fmtPrice(deal.original_price);
  const price = fmtPrice(deal.deal_price);
  const valid = fmtDate(deal.valid_until);

  const body = (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 6) * 0.05, duration: 0.4 }}
      className="group h-full flex flex-col rounded-xl overflow-hidden border border-white/8 bg-white/[0.02] hover:border-hype-cyan/30 transition-all duration-300"
    >
      {/* Media */}
      <div className="relative h-40 overflow-hidden">
        {deal.image_url ? (
          <img src={deal.image_url} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full" style={{ background: 'linear-gradient(135deg, rgba(0,242,255,0.12), rgba(191,255,0,0.10))' }} />
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          {deal.discount_label && (
            <span className="text-[11px] font-bold px-2 py-1 rounded bg-hype-green text-hype-navy">{deal.discount_label}</span>
          )}
          {deal.is_sponsored && (
            <span className="text-[11px] font-medium px-2 py-1 rounded bg-hype-cyan/90 text-hype-navy">Sponsored</span>
          )}
        </div>
        {deal.category && (
          <span className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded bg-black/40 text-white/80 inline-flex items-center gap-1">
            <Tag className="w-3 h-3" />{deal.category}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {deal.brand_name && <p className="text-xs font-mono tracking-wider text-hype-cyan uppercase mb-1">{deal.brand_name}</p>}
        <h3 className="font-heading text-base font-semibold text-white group-hover:text-hype-green transition-colors mb-2">{deal.title}</h3>
        {deal.short_description && <p className="text-sm text-hype-slate leading-relaxed mb-4 line-clamp-3">{deal.short_description}</p>}

        <div className="mt-auto space-y-3">
          {(price || original) && (
            <div className="flex items-baseline gap-2">
              {price && <span className="text-lg font-bold text-white">{price}</span>}
              {original && <span className="text-sm text-hype-slate line-through">{original}</span>}
            </div>
          )}
          <div className="flex items-center justify-between text-xs text-hype-slate">
            <span className="inline-flex items-center gap-1">
              {deal.location && <><MapPin className="w-3 h-3" />{deal.location}</>}
            </span>
            {valid && <span>Until {valid}</span>}
          </div>
          {!deal.is_sponsored && deal.source_name && (
            <p className="text-[11px] text-hype-slate/60">Special found at {deal.source_name}</p>
          )}
          {deal.cta_text && (
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-hype-cyan">
              {deal.cta_text}<ArrowUpRight className="w-4 h-4" />
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );

  // Whole card is the CTA when a URL exists.
  if (deal.cta_url) {
    return (
      <a href={deal.cta_url} onClick={onClick} target="_blank" rel="noopener noreferrer" className="block h-full">
        {body}
      </a>
    );
  }
  return <div className="h-full">{body}</div>;
}
