import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Users, Sparkles, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CreatorPreview() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(57, 255, 20, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(57, 255, 20, 0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #39FF14 0%, transparent 60%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-mono text-xs tracking-[0.2em] text-hype-green uppercase mb-4">
                Creator Network
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                Powered by Creators.{' '}
                <span className="text-hype-green text-glow-green">Built for Attention.</span>
              </h2>
              <p className="text-hype-slate text-lg leading-relaxed mb-8">
                Our creator network helps brands reach real people through trusted voices, content, and social influence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/creators">
                  <Button size="lg" className="bg-hype-green text-hype-navy hover:bg-hype-green/90 font-semibold glow-green w-full sm:w-auto">
                    Join Creator Network
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/campaigns">
                  <Button size="lg" variant="outline" className="border-hype-cyan/30 text-hype-cyan hover:bg-hype-cyan/10 w-full sm:w-auto">
                    <Zap className="w-5 h-5 mr-2" />
                    Run an Influencer Campaign
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Users, label: 'Creator Campaigns', value: 'Paid Collabs' },
              { icon: Sparkles, label: 'Content Creation', value: 'Video & Reels' },
              { icon: Globe, label: 'Multi-Platform', value: 'TikTok · IG · YT' },
              { icon: Zap, label: 'Brand Deals', value: 'Real Brands' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card-green rounded-xl p-6 text-center"
                >
                  <div className="w-10 h-10 rounded-lg bg-hype-green/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-hype-green" />
                  </div>
                  <p className="font-mono text-[10px] tracking-widest text-hype-slate uppercase mb-1">{item.label}</p>
                  <p className="font-heading text-sm font-semibold text-white">{item.value}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}