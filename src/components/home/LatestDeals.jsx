import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionHeading from '@/components/ui/SectionHeading';
import DealCard from '@/components/deals/DealCard';
import { usePublicContentStore } from '@/stores/publicContentStore';
import { trackImpressionOnce } from '@/lib/analytics';

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

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading label="Deals & Specials" title="Latest specials," titleHighlight="worth noticing." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {top.map((deal, i) => <DealCard key={deal.id} deal={deal} index={i} />)}
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
