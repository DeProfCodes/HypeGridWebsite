import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import HeroCarousel from '@/components/home/HeroCarousel';
import FeaturedVideoSection from '@/components/home/FeaturedVideoSection';
import LatestDeals from '@/components/home/LatestDeals';
import DealsClubCta from '@/components/home/DealsClubCta';
import WhatWePromote from '@/components/home/WhatWePromote';
import HypeGridEffect from '@/components/home/HypeGridEffect';
import ServicesPreview from '@/components/home/ServicesPreview';
import CreatorPreview from '@/components/home/CreatorPreview';
import PackagesPreview from '@/components/home/PackagesPreview';
import PortfolioPreview from '@/components/home/PortfolioPreview';

// New homepage direction: HypeGrid as a live campaign / discovery / advertising
// platform up top (hero carousel → featured video → latest specials → trending),
// with the original agency content moved lower down.
export default function Home() {
  return (
    <PageLayout>
      {/* What's hot right now */}
      <HeroCarousel />
      <FeaturedVideoSection />
      <LatestDeals />
      <DealsClubCta />

      {/* Agency explanation + offering (moved below the platform content) */}
      <WhatWePromote />
      <HypeGridEffect />
      <ServicesPreview />
      <CreatorPreview />
      <PackagesPreview />
      <PortfolioPreview />
    </PageLayout>
  );
}
