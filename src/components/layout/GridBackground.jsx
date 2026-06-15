import React from 'react';

export default function GridBackground({ children, className = '' }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
      
      {/* Gradient orbs */}
      <div 
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #00F2FF 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #39FF14 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}