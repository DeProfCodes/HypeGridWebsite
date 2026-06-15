import { createMockBackedStore } from './createMockBackedStore';
import { publicApi } from '@/api/publicApi';
import { servicesMock, decorateServices } from '@/data/mock/services.mock';
import { packagesMock, decoratePackages } from '@/data/mock/packages.mock';
import { testimonialsMock } from '@/data/mock/testimonials.mock';
import { caseStudiesMock } from '@/data/mock/caseStudies.mock';
import { heroPlacementsMock } from '@/data/mock/heroPlacements.mock';
import { dealsMock } from '@/data/mock/deals.mock';
import { featuredVideoMock } from '@/data/mock/featuredVideo.mock';

// Public display content. Every slice falls back to mock data on API failure so
// the marketing site never renders empty when the backend is offline.
export const usePublicContentStore = createMockBackedStore({
  slices: {
    services: {
      initial: servicesMock,
      mock: async () => servicesMock,
      api: async () => decorateServices(await publicApi.getServices()),
      fallbackToMock: true,
    },
    packages: {
      initial: packagesMock,
      mock: async () => packagesMock,
      api: async () => decoratePackages(await publicApi.getPackages()),
      fallbackToMock: true,
    },
    testimonials: {
      initial: testimonialsMock,
      mock: async () => testimonialsMock,
      api: async () => (await publicApi.getTestimonials()) ?? [],
      fallbackToMock: true,
    },
    caseStudies: {
      initial: caseStudiesMock,
      mock: async () => caseStudiesMock,
      api: async () => (await publicApi.getCaseStudies()) ?? [],
      fallbackToMock: true,
    },
    heroPlacements: {
      initial: heroPlacementsMock,
      mock: async () => heroPlacementsMock,
      api: async () => {
        const items = await publicApi.getHeroPlacements();
        // Empty live result → fall back to mock so the hero is never blank.
        return Array.isArray(items) && items.length ? items : heroPlacementsMock;
      },
      fallbackToMock: true,
    },
    deals: {
      initial: dealsMock,
      mock: async () => dealsMock,
      api: async () => (await publicApi.getDeals()) ?? [],
      fallbackToMock: true,
    },
    featuredVideo: {
      initial: featuredVideoMock,
      mock: async () => featuredVideoMock,
      // Live returns the single active video or null; pass through (null hides the section).
      api: async () => (await publicApi.getFeaturedVideo()) ?? null,
      fallbackToMock: false,
    },
  },
});
