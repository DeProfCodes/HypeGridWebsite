import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionHeading from '@/components/ui/SectionHeading';

const packages = [
  { name: 'Starter Hype', description: 'For small campaigns, basic visibility, and first-time promotion.', color: 'cyan' },
  { name: 'Growth Hype', description: 'For businesses, artists, or events ready to build stronger awareness.', color: 'green', featured: true },
  { name: 'Premium Launch', description: 'For serious launches, events, products, songs, or brands.', color: 'cyan' },
  { name: 'Monthly Brand Management', description: 'For clients who need ongoing social media presence.', color: 'green' },
];

export default function PackagesPreview() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Packages"
          title="Campaign Packages Built to"
          titleHighlight="Scale."
          subtitle="From starter campaigns to full brand management — find the right level of hype for your goals."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl p-6 bg-white/[0.03] border transition-all duration-300 ${
                pkg.featured 
                  ? 'border-hype-green/30 glow-green' 
                  : 'border-white/5 hover:border-white/15'
              }`}
            >
              {pkg.featured && (
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-3.5 h-3.5 text-hype-green fill-hype-green" />
                  <span className="font-mono text-[10px] tracking-widest text-hype-green uppercase">Popular</span>
                </div>
              )}
              <h3 className="font-heading text-lg font-bold text-white mb-2">{pkg.name}</h3>
              <p className="text-hype-slate text-sm leading-relaxed mb-6">{pkg.description}</p>
              <Link to="/packages">
                <Button
                  variant="outline"
                  size="sm"
                  className={`w-full ${
                    pkg.color === 'green' 
                      ? 'border-hype-green/20 text-hype-green hover:bg-hype-green/10' 
                      : 'border-hype-cyan/20 text-hype-cyan hover:bg-hype-cyan/10'
                  }`}
                >
                  Request Quote
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/packages">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
              View All Packages
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}