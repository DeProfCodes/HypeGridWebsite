import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', variant = 'cyan', hover = true, ...props }) {
  const borderColor = variant === 'green' 
    ? 'border-hype-green/10 hover:border-hype-green/25' 
    : 'border-hype-cyan/10 hover:border-hype-cyan/25';
  
  const glowClass = variant === 'green' ? 'hover:glow-green' : 'hover:glow-cyan';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={`
        rounded-2xl bg-white/[0.03] backdrop-blur-xl border ${borderColor}
        ${hover ? `transition-all duration-500 ${glowClass}` : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}