import React from 'react';
import { Building2, Music, CalendarDays, Rocket, ShoppingBag, User } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeading from '@/components/ui/SectionHeading';

const categories = [
  {
    icon: Building2,
    title: 'Businesses',
    description: 'Promote your business, service, shop, restaurant, salon, store, or local brand with campaigns built for visibility and trust.',
    color: 'cyan',
  },
  {
    icon: Music,
    title: 'Songs & Artists',
    description: 'Push your song, release, music video, or artist brand with content, creators, and release-week hype.',
    color: 'green',
  },
  {
    icon: CalendarDays,
    title: 'Events',
    description: 'Build anticipation, drive attendance, and create digital noise before, during, and after your event.',
    color: 'cyan',
  },
  {
    icon: Rocket,
    title: 'Startups & Apps',
    description: 'Launch your app, website, or startup with a campaign that creates awareness and momentum.',
    color: 'green',
  },
  {
    icon: ShoppingBag,
    title: 'Products',
    description: 'Promote products, offers, and launches through content, social campaigns, and creator-led exposure.',
    color: 'cyan',
  },
  {
    icon: User,
    title: 'Personal Brands',
    description: 'Grow your personal brand with better content, stronger messaging, and consistent visibility.',
    color: 'green',
  },
];

export default function WhatWePromote() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="What We Promote"
          title="Every Brand Deserves"
          titleHighlight="Attention."
          subtitle="From local businesses to global music releases — we create campaigns that make people notice."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <GlassCard key={cat.title} variant={cat.color} className="p-8 group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                  cat.color === 'green' ? 'bg-hype-green/10' : 'bg-hype-cyan/10'
                } transition-colors group-hover:${cat.color === 'green' ? 'bg-hype-green/20' : 'bg-hype-cyan/20'}`}>
                  <Icon className={`w-6 h-6 ${cat.color === 'green' ? 'text-hype-green' : 'text-hype-cyan'}`} />
                </div>
                <h3 className="font-heading text-xl font-semibold text-white mb-3">{cat.title}</h3>
                <p className="text-hype-slate text-sm leading-relaxed">{cat.description}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}