import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({ label, title, subtitle, align = 'center', titleHighlight }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {label && (
        <p className="font-mono text-xs tracking-[0.2em] text-hype-cyan uppercase mb-4">
          {label}
        </p>
      )}
      <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
        {title}
        {titleHighlight && (
          <span className="text-hype-green text-glow-green"> {titleHighlight}</span>
        )}
      </h2>
      {subtitle && (
        <p className={`text-hype-slate text-lg leading-relaxed ${align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}