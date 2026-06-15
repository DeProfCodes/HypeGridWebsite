import React from 'react';
import { motion } from 'framer-motion';
import { Search, Paintbrush, Zap, TrendingUp } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const steps = [
  {
    num: '01',
    title: 'Discover',
    description: 'We understand your brand, audience, goal, and what you want people to notice.',
    icon: Search,
    color: 'cyan',
  },
  {
    num: '02',
    title: 'Create',
    description: 'We build the content, visuals, hooks, captions, and campaign structure.',
    icon: Paintbrush,
    color: 'green',
  },
  {
    num: '03',
    title: 'Activate',
    description: 'We push through social platforms, creators, influencers, communities, and paid traffic where needed.',
    icon: Zap,
    color: 'cyan',
  },
  {
    num: '04',
    title: 'Amplify',
    description: 'We track what works, improve the campaign, and help your brand keep momentum.',
    icon: TrendingUp,
    color: 'green',
  },
];

export default function HypeGridEffect() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(57, 255, 20, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(57, 255, 20, 1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          label="The Process"
          title="The HypeGrid"
          titleHighlight="Effect."
          subtitle="Four phases that turn your brand from invisible to impossible to ignore."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative group"
              >
                {/* Connector line */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-white/10 to-transparent z-0" aria-hidden="true" />
                )}

                <div className="relative">
                  <p className={`font-mono text-5xl font-bold mb-4 ${
                    step.color === 'green' ? 'text-hype-green/10' : 'text-hype-cyan/10'
                  }`}>
                    {step.num}
                  </p>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    step.color === 'green' ? 'bg-hype-green/10' : 'bg-hype-cyan/10'
                  }`}>
                    <Icon className={`w-6 h-6 ${step.color === 'green' ? 'text-hype-green' : 'text-hype-cyan'}`} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-hype-slate text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}