import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionHeading from '@/components/ui/SectionHeading';
import { usePublicContentStore } from '@/stores/publicContentStore';
import { track, trackImpressionOnce } from '@/lib/analytics';

export function youTubeId(url) {
  if (!url) return null;
  const m = String(url).match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (m) return m[1];
  return /^[\w-]{11}$/.test(url) ? url : null;
}

export default function FeaturedVideoSection() {
  const video = usePublicContentStore((s) => s.featuredVideo);
  const fetchFeaturedVideo = usePublicContentStore((s) => s.fetchFeaturedVideo);

  useEffect(() => { fetchFeaturedVideo(); }, [fetchFeaturedVideo]);

  useEffect(() => {
    if (video?.id) trackImpressionOnce(`fv-${video.id}`, 'video_impression', { entityType: 'FeaturedVideo', entityId: video.id });
  }, [video]);

  // No active featured video → hide the section entirely.
  if (!video || video.is_active === false) return null;
  const id = youTubeId(video.you_tube_url);
  if (!id) return null;

  const onCta = () => track('video_cta_click', { entityType: 'FeaturedVideo', entityId: video.id });
  const ctaInternal = video.cta_url?.startsWith('/');

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading label="Featured" title="On the grid" titleHighlight="right now." />
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 aspect-video rounded-2xl overflow-hidden border border-white/10 glass-card"
          >
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${id}`}
              title={video.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>

          <div className="lg:col-span-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-hype-cyan/10 border border-hype-cyan/20 mb-5">
              <Play className="w-3.5 h-3.5 text-hype-cyan" />
              <span className="text-xs font-mono tracking-wider text-hype-cyan uppercase">Featured Video</span>
            </div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">{video.title}</h3>
            {video.subtitle && <p className="text-hype-slate leading-relaxed mb-8">{video.subtitle}</p>}
            {video.cta_text && (
              ctaInternal ? (
                <Link to={video.cta_url} onClick={onCta}>
                  <Button className="bg-hype-green text-hype-navy hover:bg-hype-green/90 font-semibold">{video.cta_text}<ArrowRight className="w-4 h-4 ml-2" /></Button>
                </Link>
              ) : (
                <a href={video.cta_url || '#'} onClick={onCta} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-hype-green text-hype-navy hover:bg-hype-green/90 font-semibold">{video.cta_text}<ArrowRight className="w-4 h-4 ml-2" /></Button>
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
