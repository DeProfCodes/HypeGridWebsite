import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Target, Lightbulb, Users, Globe, BarChart3, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import GridBackground from '@/components/layout/GridBackground';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';

const pillars = [
  { icon: Palette, label: 'Creative Campaigns', color: 'cyan' },
  { icon: Users, label: 'Influencer-Powered Promotion', color: 'green' },
  { icon: Lightbulb, label: 'Digital Storytelling', color: 'cyan' },
  { icon: Target, label: 'Brand Visibility', color: 'green' },
  { icon: Globe, label: 'African Digital Culture', color: 'cyan' },
  { icon: BarChart3, label: 'Business Growth', color: 'green' },
];

export default function About() {
  return (
    <PageLayout>
      <GridBackground className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="About HypeGrid"
            title="Built for the New Age of"
            titleHighlight="Attention."
            subtitle="HypeGrid was built for the new age of attention — where brands, artists, creators, and businesses need more than just posts. They need strategy, content, creators, momentum, and a digital presence people can feel."
          />
        </div>
      </GridBackground>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* What HypeGrid Combines */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="font-mono text-xs tracking-[0.2em] text-hype-cyan uppercase mb-3">What We Combine</p>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white">
                The HypeGrid DNA
              </h3>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pillars.map((p, i) => {
                const Icon = p.icon;
                return (
                  <GlassCard key={p.label} variant={p.color} className="p-6 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      p.color === 'green' ? 'bg-hype-green/10' : 'bg-hype-cyan/10'
                    }`}>
                      <Icon className={`w-6 h-6 ${p.color === 'green' ? 'text-hype-green' : 'text-hype-cyan'}`} />
                    </div>
                    <h4 className="font-heading text-base font-semibold text-white">{p.label}</h4>
                  </GlassCard>
                );
              })}
            </div>
          </div>

          {/* Why HypeGrid Exists */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="glass-card rounded-2xl p-10 md:p-16 max-w-4xl mx-auto text-center">
              <p className="font-mono text-xs tracking-[0.2em] text-hype-green uppercase mb-6">Why We Exist</p>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-6">
                Why HypeGrid Exists
              </h3>
              <p className="text-hype-slate text-lg leading-relaxed mb-8">
                Many great businesses, songs, events, and ideas never get noticed because they do not have the right content, campaign structure, or promotional network behind them. HypeGrid exists to close that gap.
              </p>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-hype-cyan to-transparent mx-auto" />
            </div>
          </motion.div>

          {/* More Than Marketing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="glass-card-green rounded-2xl p-10 md:p-16 max-w-4xl mx-auto">
              <p className="font-mono text-xs tracking-[0.2em] text-hype-green uppercase mb-6">The Movement</p>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-6">
                More Than Marketing
              </h3>
              <p className="text-hype-slate text-lg leading-relaxed mb-4">
                We are building a digital promotion movement where brands and creators grow together.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                {[
                  'Businesses get visibility.',
                  'Artists get campaign support.',
                  'Events get attention.',
                  'Creators get opportunities.',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-white/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-hype-green flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-hype-slate text-base mt-8 italic">
                Audiences discover what is worth noticing.
              </p>
            </div>
          </motion.div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/campaigns">
              <Button size="lg" className="bg-hype-cyan text-hype-navy hover:bg-hype-cyan/90 font-semibold glow-cyan w-full sm:w-auto">
                <Zap className="w-5 h-5 mr-2" />
                Start a Campaign
              </Button>
            </Link>
            <Link to="/creators">
              <Button size="lg" variant="outline" className="border-hype-green/30 text-hype-green hover:bg-hype-green/10 w-full sm:w-auto">
                Join Creator Network
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}