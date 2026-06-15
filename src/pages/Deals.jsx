import React, { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeading from '@/components/ui/SectionHeading';
import { Input } from '@/components/ui/input';
import DealCard from '@/components/deals/DealCard';
import { usePublicContentStore } from '@/stores/publicContentStore';
import { dealCategories } from '@/data/mock/deals.mock';
import { trackImpressionOnce } from '@/lib/analytics';

export default function Deals() {
  const deals = usePublicContentStore((s) => s.deals) || [];
  const fetchDeals = usePublicContentStore((s) => s.fetchDeals);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => { fetchDeals(); }, [fetchDeals]);
  useEffect(() => { trackImpressionOnce('deals-page', 'card_view', { entityType: 'Deal', entityId: null }); }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return deals.filter((d) => {
      const matchCat = category === 'All' || d.category === category;
      const matchSearch = !q
        || d.title?.toLowerCase().includes(q)
        || d.brand_name?.toLowerCase().includes(q)
        || d.short_description?.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [deals, category, search]);

  return (
    <PageLayout>
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Deals & Specials"
            title="Specials worth"
            titleHighlight="noticing."
            subtitle="Hand-picked deals, discounts and offers from shops and brands across South Africa. Updated regularly."
          />

          {/* Search + category filter */}
          <div className="flex flex-col gap-5 mb-10">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hype-slate" />
              <Input
                placeholder="Search specials..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-white/[0.03] border-white/10 text-white h-11"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {dealCategories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                    category === c
                      ? 'bg-hype-cyan text-hype-navy border-hype-cyan'
                      : 'text-hype-slate border-white/10 hover:text-white hover:border-white/20'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-hype-slate py-20">No specials match your search right now. Check back soon.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((deal, i) => <DealCard key={deal.id} deal={deal} index={i} />)}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
