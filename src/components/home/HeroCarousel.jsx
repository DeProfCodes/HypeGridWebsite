import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePublicContentStore } from '@/stores/publicContentStore';
import { track, trackImpressionOnce } from '@/lib/analytics';
import DefaultHero from '@/components/home/DefaultHero';

const AUTOPLAY_MS = 6000;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return isMobile;
}

// Renders the right element for a slide's CTA target type, tracking the click.
function HeroCta({ slide }) {
  if (!slide.cta_text) return null;
  const onClick = () => {
    if (slide.tracking_enabled === false) return;
    const evt = slide.cta_target_type === 'whatsapp' ? 'whatsapp_click'
      : slide.cta_target_type === 'external' ? 'external_click'
      : 'cta_click';
    track(evt, { entityType: 'HeroPlacement', entityId: slide.id });
  };
  const label = <>{slide.cta_text}<ArrowRight className="w-5 h-5 ml-2" /></>;
  const cls = 'bg-hype-cyan text-hype-navy hover:bg-hype-cyan/90 font-bold text-base px-8 h-14 glow-cyan';

  const internal = slide.cta_target_type === 'internal' || slide.cta_target_type === 'deal' || slide.cta_target_type === 'campaign';
  if (internal && slide.cta_url?.startsWith('/')) {
    return <Link to={slide.cta_url} onClick={onClick}><Button size="lg" className={cls}>{label}</Button></Link>;
  }
  return (
    <a href={slide.cta_url || '#'} onClick={onClick} target="_blank" rel="noopener noreferrer">
      <Button size="lg" className={cls}>{label}</Button>
    </a>
  );
}

export default function HeroCarousel() {
  const slides = (usePublicContentStore((s) => s.heroPlacements) || []).filter((h) => h.is_active !== false);
  const fetchHeroPlacements = usePublicContentStore((s) => s.fetchHeroPlacements);
  const [index, setIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => { fetchHeroPlacements(); }, [fetchHeroPlacements]);

  // Auto-rotate.
  useEffect(() => {
    if (slides.length <= 1) return undefined;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [slides.length]);

  // Keep index in range as data loads.
  useEffect(() => { if (index >= slides.length) setIndex(0); }, [slides.length, index]);

  // Hero impression — once per slide per session.
  const active = slides[index];
  useEffect(() => {
    if (active && active.tracking_enabled !== false) {
      trackImpressionOnce(`hero-${active.id}`, 'impression', { entityType: 'HeroPlacement', entityId: active.id });
    }
  }, [active]);

  // No active/in-date placements (empty API result, or a failure with no mock
  // fallback) → show the built-in HypeGrid advertising hero, never a blank space.
  if (!slides.length) return <DefaultHero />;

  const go = (dir) => setIndex((i) => (i + dir + slides.length) % slides.length);
  const img = isMobile ? (active.mobile_image_url || active.desktop_image_url) : active.desktop_image_url;

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-20">
      {/* Background: slide image when provided, else branded gradient + grid */}
      <div className="absolute inset-0" aria-hidden="true">
        {img ? (
          <>
            <img src={img} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-hype-navy via-hype-navy/80 to-hype-navy/40" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 opacity-[0.05]" style={{
              backgroundImage: 'linear-gradient(rgba(0,242,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,242,255,1) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }} />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.10]"
              style={{ background: 'radial-gradient(circle, #00F2FF 0%, transparent 60%)' }} />
            <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.07]"
              style={{ background: 'radial-gradient(circle, #39FF14 0%, transparent 60%)' }} />
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            {active.badge && (
              <p className="font-mono text-xs tracking-[0.25em] text-hype-cyan uppercase mb-6">{active.badge}</p>
            )}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6">
              {active.title}
            </h1>
            {active.subtitle && (
              <p className="text-hype-slate text-lg md:text-xl leading-relaxed mb-8 max-w-lg">{active.subtitle}</p>
            )}
            {active.sponsor_name && (
              <p className="text-xs font-mono text-hype-slate/70 mb-6">Sponsored by {active.sponsor_name}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
              <HeroCta slide={active} />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        {slides.length > 1 && (
          <div className="flex items-center gap-4 mt-12">
            <button onClick={() => go(-1)} aria-label="Previous slide"
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white hover:bg-white/5">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {slides.map((s, i) => (
                <button key={s.id} aria-label={`Go to slide ${i + 1}`} onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${i === index ? 'w-8 bg-hype-cyan' : 'w-2 bg-white/20 hover:bg-white/40'}`} />
              ))}
            </div>
            <button onClick={() => go(1)} aria-label="Next slide"
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white hover:bg-white/5">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
