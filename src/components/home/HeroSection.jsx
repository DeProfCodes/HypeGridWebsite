import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, TrendingUp, Users, Music, Calendar, Megaphone, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const floatingCards = [
  { label: 'REACH', value: '1.2M+', icon: TrendingUp, color: 'cyan' },
  { label: 'CREATORS', value: '500+', icon: Users, color: 'green' },
  { label: 'CAMPAIGNS', value: '200+', icon: Megaphone, color: 'cyan' },
];

const credibilityTags = [
  'Business Promotion',
  'Music Promo',
  'Influencer Campaigns',
  'Launch Strategy',
  'Social Media Management',
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Animated grid background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 242, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 255, 1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #00F2FF 0%, transparent 60%)' }}
        />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #39FF14 0%, transparent 60%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-mono text-xs tracking-[0.25em] text-hype-cyan uppercase mb-6">
                Creative Marketing & Promotion Network
              </p>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6">
                We Build Hype Around{' '}
                <span className="text-hype-green text-glow-green">Brands</span>,{' '}
                <span className="text-hype-cyan text-glow-cyan">Music</span> &{' '}
                <span className="text-white">Movements.</span>
              </h1>
              <p className="text-hype-slate text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
                Content, creators, campaigns, and digital strategy built to get your brand seen, trusted, and talked about.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/campaigns">
                  <Button size="lg" className="bg-hype-cyan text-hype-navy hover:bg-hype-cyan/90 font-bold text-base px-8 h-14 glow-cyan w-full sm:w-auto">
                    <Zap className="w-5 h-5 mr-2" />
                    Start a Campaign
                  </Button>
                </Link>
                <Link to="/creators">
                  <Button size="lg" variant="outline" className="border-hype-green/30 text-hype-green hover:bg-hype-green/10 font-semibold text-base px-8 h-14 w-full sm:w-auto">
                    Join Creator Network
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Credibility strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-2"
            >
              {credibilityTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-xs font-mono tracking-wider text-hype-slate border border-white/10 bg-white/[0.02]"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Floating signal cards */}
          <div className="relative hidden lg:block">
            <div className="relative h-[500px]">
              {/* Central grid icon */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-20"
                aria-hidden="true"
              >
                <div className="w-full h-full rounded-2xl border border-hype-cyan/30 grid grid-cols-3 gap-1 p-3">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="rounded-sm bg-hype-cyan/20" />
                  ))}
                </div>
              </motion.div>

              {/* Floating cards */}
              {floatingCards.map((card, i) => {
                const positions = [
                  'top-8 right-8',
                  'top-1/2 -translate-y-1/2 left-0',
                  'bottom-12 right-16',
                ];
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
                    className={`absolute ${positions[i]}`}
                  >
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
                      className={`glass-card rounded-xl p-5 ${card.color === 'green' ? 'border-hype-green/20' : 'border-hype-cyan/20'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          card.color === 'green' ? 'bg-hype-green/10' : 'bg-hype-cyan/10'
                        }`}>
                          <Icon className={`w-5 h-5 ${card.color === 'green' ? 'text-hype-green' : 'text-hype-cyan'}`} />
                        </div>
                        <div>
                          <p className="font-mono text-[10px] tracking-[0.15em] text-hype-slate uppercase">{card.label}</p>
                          <p className={`font-heading text-xl font-bold ${card.color === 'green' ? 'text-hype-green' : 'text-hype-cyan'}`}>
                            {card.value}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* Additional floating tags */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-32 left-24"
              >
                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/[0.03] border border-white/10">
                  <Music className="w-3.5 h-3.5 text-hype-green" />
                  <span className="text-xs font-mono text-hype-slate">Music Release</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute bottom-32 left-8"
              >
                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/[0.03] border border-white/10">
                  <Calendar className="w-3.5 h-3.5 text-hype-cyan" />
                  <span className="text-xs font-mono text-hype-slate">Event Push</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute top-4 left-48"
              >
                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/[0.03] border border-white/10">
                  <BarChart3 className="w-3.5 h-3.5 text-hype-green" />
                  <span className="text-xs font-mono text-hype-slate">Brand Growth</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}