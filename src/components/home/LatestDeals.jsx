import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionHeading from '@/components/ui/SectionHeading';
import DealCard from '@/components/deals/DealCard';
import { usePublicContentStore } from '@/stores/publicContentStore';
import { track, trackImpressionOnce } from '@/lib/analytics';

// Sales placeholder shown in low-content states ("Your Deal Could Be Here").
function DealPlaceholderCard() {
  return (
    <Link
      to="/campaigns"
      onClick={() => track('cta_click', { entityType: 'Other', entityId: 'deal-placeholder' })}
      className="group h-full flex flex-col rounded-xl overflow-hidden border border-dashed border-hype-cyan/25 bg-white/[0.02] hover:border-hype-cyan/50 transition-all duration-300"
    >
      <div className="h-40 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(0,242,255,0.08), rgba(57, 255, 20,0.06))' }}>
        <Sparkles className="w-8 h-8 text-hype-cyan/70" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading text-base font-semibold text-white mb-2">Your Deal Could Be Here</h3>
        <p className="text-sm text-hype-slate leading-relaxed mb-4">
          Feature your special on HypeGrid and reach people looking for what&rsquo;s hot.
        </p>
        <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-hype-cyan">
          Advertise a Deal<ArrowUpRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}

export default function LatestDeals() {
  const deals = usePublicContentStore((s) => s.deals) || [];
  const fetchDeals = usePublicContentStore((s) => s.fetchDeals);

  useEffect(() => { fetchDeals(); }, [fetchDeals]);

  // Simple section-level impression (per session).
  useEffect(() => {
    if (deals.length) trackImpressionOnce('deals-section', 'card_view', { entityType: 'Deal', entityId: null });
  }, [deals.length]);

  if (!deals.length) return null;

  // Featured first, then by priority order the API already returns.
  const ordered = [...deals].sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
  const top = ordered.slice(0, 6);
  // Low-content polish: in thin states (1–2 deals) add a "promote your deal" card.
  const showPlaceholder = top.length < 3;

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading label="Deals & Specials" title="Latest specials," titleHighlight="worth noticing." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {top.map((deal, i) => <DealCard key={deal.id} deal={deal} index={i} />)}
          {showPlaceholder && <DealPlaceholderCard />}
        </div>
        <div className="text-center mt-12">
          <Link to="/deals">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
              See all specials<ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
