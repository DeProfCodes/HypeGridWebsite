// Fallback deals/specials (snake_case to match the live API). Categories mirror
// the backend HypeGridValues.DealCategories.
export const dealCategories = [
  'All', 'Food', 'Grocery', 'Fashion', 'Beauty', 'Tech', 'Mobile', 'Home',
  'Events', 'Music', 'Travel', 'Services', 'Apps', 'Other',
];

export const dealsMock = [
  {
    id: 'deal-1', title: 'Mid-month airtime & data bundles', slug: 'mid-month-airtime-data-1',
    brand_name: 'Mobile Networks', category: 'Mobile',
    short_description: 'Bonus data and airtime specials running across major networks this month.',
    image_url: '', mobile_image_url: '', original_price: null, deal_price: null,
    discount_label: 'Bonus data', cta_text: 'View deal', cta_url: '', location: 'Nationwide',
    valid_until: '2026-07-15T00:00:00Z', is_featured: true, is_sponsored: false, source_name: 'Mobile Networks',
  },
  {
    id: 'deal-2', title: 'Weekend grocery savings', slug: 'weekend-grocery-savings-2',
    brand_name: 'Local Grocers', category: 'Grocery',
    short_description: 'Stock up specials on everyday essentials at participating stores.',
    image_url: '', mobile_image_url: '', original_price: null, deal_price: null,
    discount_label: 'Save up to 30%', cta_text: 'View deal', cta_url: '', location: 'Nationwide',
    valid_until: '2026-07-10T00:00:00Z', is_featured: true, is_sponsored: false, source_name: 'Local Grocers',
  },
  {
    id: 'deal-3', title: 'Fresh streetwear drop', slug: 'fresh-streetwear-drop-3',
    brand_name: 'Local Brands', category: 'Fashion',
    short_description: 'New-season streetwear from South African brands, while stocks last.',
    image_url: '', mobile_image_url: '', original_price: 899, deal_price: 599,
    discount_label: 'Save R300', cta_text: 'Shop drop', cta_url: '', location: 'Online',
    valid_until: '2026-07-20T00:00:00Z', is_featured: false, is_sponsored: false, source_name: 'Local Brands',
  },
  {
    id: 'deal-4', title: 'Two-for-one meal specials', slug: 'two-for-one-meals-4',
    brand_name: 'Local Eateries', category: 'Food',
    short_description: 'Midweek two-for-one deals at selected restaurants and takeaways.',
    image_url: '', mobile_image_url: '', original_price: null, deal_price: null,
    discount_label: '2 for 1', cta_text: 'View deal', cta_url: '', location: 'Selected stores',
    valid_until: '2026-07-05T00:00:00Z', is_featured: false, is_sponsored: false, source_name: 'Local Eateries',
  },
  {
    id: 'deal-5', title: 'Tech accessory clearance', slug: 'tech-accessory-clearance-5',
    brand_name: 'Tech Stores', category: 'Tech',
    short_description: 'Clearance pricing on headphones, chargers, and accessories.',
    image_url: '', mobile_image_url: '', original_price: 499, deal_price: 299,
    discount_label: 'Clearance', cta_text: 'View deal', cta_url: '', location: 'Online',
    valid_until: '2026-07-25T00:00:00Z', is_featured: false, is_sponsored: true, source_name: 'Tech Stores',
  },
  {
    id: 'deal-6', title: 'Spa & beauty midweek special', slug: 'spa-beauty-midweek-6',
    brand_name: 'Local Salons', category: 'Beauty',
    short_description: 'Discounted treatments at participating salons and spas midweek.',
    image_url: '', mobile_image_url: '', original_price: null, deal_price: null,
    discount_label: '20% off', cta_text: 'View deal', cta_url: '', location: 'Selected stores',
    valid_until: '2026-07-18T00:00:00Z', is_featured: false, is_sponsored: false, source_name: 'Local Salons',
  },
];
