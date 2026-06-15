import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import GridBackground from '@/components/layout/GridBackground';
import SectionHeading from '@/components/ui/SectionHeading';
import { usePublicContentStore } from '@/stores/publicContentStore';

export default function Packages() {
  // Content comes from the store: live API when available, else mock fallback.
  const packages = usePublicContentStore((s) => s.packages);
  const fetchPackages = usePublicContentStore((s) => s.fetchPackages);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  return (
    <PageLayout>
      <GridBackground className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Packages"
            title="Campaign Packages Built to"
            titleHighlight="Scale."
            subtitle="From starter campaigns to full brand management — choose a package or request a custom campaign."
          />
        </div>
      </GridBackground>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, i) => {
              const Icon = pkg.icon;
              return (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-2xl p-8 bg-white/[0.03] backdrop-blur-xl border transition-all duration-300 flex flex-col ${
                    pkg.featured 
                      ? 'border-hype-green/30 glow-green' 
                      : 'border-white/5 hover:border-white/15'
                  }`}
                >
                  {pkg.featured && (
                    <div className="flex items-center gap-1.5 mb-4">
                      <Star className="w-4 h-4 text-hype-green fill-hype-green" />
                      <span className="font-mono text-[10px] tracking-widest text-hype-green uppercase">Most Popular</span>
                    </div>
                  )}

                  {Icon && (
                    <div className="w-10 h-10 rounded-lg bg-hype-cyan/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-hype-cyan" />
                    </div>
                  )}

                  <h3 className="font-heading text-xl font-bold text-white mb-2">{pkg.name}</h3>
                  <p className="text-hype-slate text-sm leading-relaxed mb-6">{pkg.description}</p>

                  <div className="mb-8 flex-1">
                    <p className="font-mono text-[10px] tracking-widest text-hype-slate uppercase mb-3">Includes</p>
                    <ul className="space-y-2.5">
                      {pkg.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-white/80">
                          <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${pkg.color === 'green' ? 'text-hype-green' : 'text-hype-cyan'}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link to="/campaigns">
                    <Button
                      className={`w-full font-semibold ${
                        pkg.featured
                          ? 'bg-hype-green text-hype-navy hover:bg-hype-green/90'
                          : pkg.color === 'cyan'
                            ? 'bg-hype-cyan/10 text-hype-cyan border border-hype-cyan/20 hover:bg-hype-cyan/20'
                            : 'bg-hype-green/10 text-hype-green border border-hype-green/20 hover:bg-hype-green/20'
                      }`}
                    >
                      {pkg.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
              <p className="text-hype-slate text-sm leading-relaxed">
                Packages can be customized based on campaign goals, platforms, content needs, creator involvement, and budget. 
                <Link to="/campaigns" className="text-hype-cyan hover:text-hype-cyan/80 ml-1 font-medium">
                  Start a campaign request →
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}