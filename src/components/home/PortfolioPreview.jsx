import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const cases = [
  { category: 'Business Launch', label: 'Local brand campaign — visibility and trust.', color: 'cyan' },
  { category: 'Music Campaign', label: 'Release-week push — content, creators, streams.', color: 'green' },
  { category: 'Event Push', label: 'Countdown campaign — attendance and digital noise.', color: 'cyan' },
  { category: 'App Launch', label: 'Startup awareness — content and momentum.', color: 'green' },
  { category: 'Social Media Growth', label: 'Monthly brand management — consistency and reach.', color: 'cyan' },
];

export default function PortfolioPreview() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Portfolio"
          title="Campaign"
          titleHighlight="Showcase."
          subtitle="Real campaigns. Real results. Selected case studies coming soon."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((item, i) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-${item.color === 'green' ? 'hype-green' : 'hype-cyan'}/20 transition-all duration-300 group`}
            >
              <div className={`h-40 relative flex items-center justify-center ${
                item.color === 'green' ? 'bg-hype-green/[0.03]' : 'bg-hype-cyan/[0.03]'
              }`}>
                <p className="font-heading text-lg font-bold text-white/20">Campaign showcase coming soon.</p>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-white/40" />
                </div>
              </div>
              <div className="p-5">
                <p className={`font-mono text-[10px] tracking-widest uppercase mb-1 ${
                  item.color === 'green' ? 'text-hype-green' : 'text-hype-cyan'
                }`}>
                  {item.category}
                </p>
                <p className="text-hype-slate text-sm">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}