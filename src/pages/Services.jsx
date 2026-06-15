import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import GridBackground from '@/components/layout/GridBackground';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { usePublicContentStore } from '@/stores/publicContentStore';

export default function Services() {
  // Content comes from the store: live API when available, else mock fallback.
  const services = usePublicContentStore((s) => s.services);
  const fetchServices = usePublicContentStore((s) => s.fetchServices);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return (
    <PageLayout>
      {/* Hero */}
      <GridBackground className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Services"
            title="Campaigns Built for the Way People"
            titleHighlight="Discover Brands Today."
            subtitle="HypeGrid combines content, creators, social media, and digital strategy to help brands, artists, events, and businesses build visibility."
          />
        </div>
      </GridBackground>

      {/* Services Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <GlassCard key={service.title} variant={service.color} className="p-8 md:p-10">
                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          service.color === 'green' ? 'bg-hype-green/10' : 'bg-hype-cyan/10'
                        }`}>
                          <Icon className={`w-6 h-6 ${service.color === 'green' ? 'text-hype-green' : 'text-hype-cyan'}`} />
                        </div>
                        <h3 className="font-heading text-2xl font-bold text-white">{service.title}</h3>
                      </div>
                      <p className="text-hype-slate text-base leading-relaxed">{service.description}</p>
                    </div>
                    <div>
                      <p className="font-mono text-xs tracking-widest text-hype-slate uppercase mb-4">Includes</p>
                      <ul className="space-y-2.5">
                        {service.includes.map((item) => (
                          <li key={item} className="flex items-center gap-3 text-sm text-white/80">
                            <Check className={`w-4 h-4 flex-shrink-0 ${service.color === 'green' ? 'text-hype-green' : 'text-hype-cyan'}`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="glass-card rounded-2xl p-10 max-w-2xl mx-auto">
              <p className="text-hype-slate text-lg mb-6">
                Not sure what you need? Start a campaign request and we'll help shape the right approach.
              </p>
              <Link to="/campaigns">
                <Button size="lg" className="bg-hype-cyan text-hype-navy hover:bg-hype-cyan/90 font-semibold glow-cyan">
                  <Zap className="w-5 h-5 mr-2" />
                  Start a Campaign
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}