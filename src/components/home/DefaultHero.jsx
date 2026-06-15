import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Users, Megaphone, Tag, Music, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { track, trackImpressionOnce } from '@/lib/analytics';

const ENTITY = { entityType: 'Other', entityId: 'default-home-hero' };

const chips = ['Business Promotion', 'Deals & Specials', 'Music Releases', 'Events', 'Creator Campaigns'];

const signalCards = [
  { label: 'CAMPAIGNS', value: 'Get Seen', icon: Megaphone, color: 'cyan', pos: 'top-8 right-8' },
  { label: 'DEALS & SPECIALS', value: "What's Hot", icon: Tag, color: 'green', pos: 'top-1/2 -translate-y-1/2 left-0' },
  { label: 'CREATORS', value: 'Real Reach', icon: Users, color: 'cyan', pos: 'bottom-12 right-16' },
];

/**
 * Built-in HypeGrid advertising hero shown when there are no active/in-date hero
 * placements (empty API result, or a failure with no mock fallback). It is an
 * intentional sales hero — never an error/empty state.
 */
export default function DefaultHero() {
  useEffect(() => {
    trackImpressionOnce('default-home-hero', 'impression', ENTITY);
  }, []);

  const onCta = () => track('cta_click', ENTITY);

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-20">
      {/* Premium dark background: grid + green/cyan glow */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'linear-gradient(rgba(0,242,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,242,255,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.10]"
          style={{ background: 'radial-gradient(circle, #00F2FF 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #39FF14 0%, transparent 60%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: sales copy */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="font-mono text-xs tracking-[0.25em] text-hype-cyan uppercase mb-6">Advertising Inventory · HypeGrid</p>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6">
              Advertise Your Brand on{' '}
              <span className="text-hype-green text-glow-green">HypeGrid</span>
            </h1>
            <p className="text-hype-slate text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
              Promote your business, deal, song, event, product, or campaign on a platform built for attention, creators, and discovery.
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {chips.map((c) => (
                <span key={c} className="px-3 py-1.5 rounded-full text-xs font-mono tracking-wider text-hype-slate border border-white/10 bg-white/[0.02]">
                  {c}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <Link to="/campaigns" onClick={onCta}>
                <Button size="lg" className="bg-hype-cyan text-hype-navy hover:bg-hype-cyan/90 font-bold text-base px-8 h-14 glow-cyan w-full sm:w-auto">
                  <Zap className="w-5 h-5 mr-2" />Start a Campaign
                </Button>
              </Link>
              <Link to="/packages" onClick={onCta}>
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 font-semibold text-base px-8 h-14 w-full sm:w-auto">
                  View Packages
                </Button>
              </Link>
              <Link to="/creators" onClick={onCta}>
                <Button size="lg" variant="ghost" className="text-hype-green border border-hype-green/20 hover:bg-hype-green/10 hover:text-hype-green font-semibold text-base px-8 h-14 w-full sm:w-auto">
                  Join Creator Network<ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right: campaign/deals/creator signal cards (avoids blank space) */}
          <div className="relative hidden lg:block">
            <div className="relative h-[460px]">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-20" aria-hidden="true">
                <div className="w-full h-full rounded-2xl border border-hype-cyan/30 grid grid-cols-3 gap-1 p-3">
                  {Array.from({ length: 9 }).map((_, i) => <div key={i} className="rounded-sm bg-hype-cyan/20" />)}
                </div>
              </motion.div>

              {signalCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div key={card.label} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 + i * 0.18, duration: 0.6 }} className={`absolute ${card.pos}`}>
                    <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
                      className={`glass-card rounded-xl p-5 ${card.color === 'green' ? 'border-hype-green/20' : 'border-hype-cyan/20'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color === 'green' ? 'bg-hype-green/10' : 'bg-hype-cyan/10'}`}>
                          <Icon className={`w-5 h-5 ${card.color === 'green' ? 'text-hype-green' : 'text-hype-cyan'}`} />
                        </div>
                        <div>
                          <p className="font-mono text-[10px] tracking-[0.15em] text-hype-slate uppercase">{card.label}</p>
                          <p className={`font-heading text-xl font-bold ${card.color === 'green' ? 'text-hype-green' : 'text-hype-cyan'}`}>{card.value}</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}

              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute top-28 left-24">
                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/[0.03] border border-white/10">
                  <Music className="w-3.5 h-3.5 text-hype-green" /><span className="text-xs font-mono text-hype-slate">Music Release</span>
                </div>
              </motion.div>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }} className="absolute bottom-28 left-8">
                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/[0.03] border border-white/10">
                  <Calendar className="w-3.5 h-3.5 text-hype-cyan" /><span className="text-xs font-mono text-hype-slate">Event Push</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
