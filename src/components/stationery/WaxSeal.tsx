import React from 'react';

interface WaxSealProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function WaxSeal({
  size = 'md',
  className = '',
}: WaxSealProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
  }[size];

  const emblemSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full select-none transition-transform duration-300 hover:scale-105 ${sizeClasses} ${className}`}
      style={{
        background: 'radial-gradient(circle at 35% 30%, #F5E2B3 0%, #D8B263 35%, #B38734 70%, #7A5918 100%)',
        boxShadow:
          '0 4px 14px -1px rgba(92, 65, 14, 0.4), inset 0 2px 3px rgba(255, 255, 255, 0.6), inset 0 -3px 4px rgba(60, 42, 8, 0.5)',
      }}
    >
      {/* Irregular natural wax melt edge ring */}
      <div
        className="absolute inset-[3px] rounded-full border border-[#FFE7A8]/50"
        style={{
          boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.4), inset 0 -1px 2px rgba(0,0,0,0.3)',
        }}
      />

      {/* Wax drip imperfections (gives realistic physical melted wax appearance) */}
      <div className="absolute -top-[1px] right-2 w-2 h-2 rounded-full bg-[#C89E46] opacity-70 blur-[0.4px]" />
      <div className="absolute -bottom-[2px] left-3 w-3 h-2 rounded-full bg-[#A87B22] opacity-80 blur-[0.4px]" />

      {/* Embossed inner stamp disc */}
      <div
        className={`rounded-full flex items-center justify-center border border-[#8C6215]/60 ${emblemSizes}`}
        style={{
          background: 'radial-gradient(circle at 45% 40%, #DDB86C 0%, #B88E39 65%, #946C1E 100%)',
          boxShadow: 'inset 0 2px 4px rgba(45, 30, 6, 0.5), 0 1px 2px rgba(255,255,255,0.4)',
        }}
      >
        {/* Single Classic Handcrafted Rose & Laurel Emblem */}
        <svg viewBox="0 0 40 40" fill="none" className="w-4/5 h-4/5 text-[#5C3F0C] drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">
          <circle cx="20" cy="20" r="15" stroke="#5C3F0C" strokeWidth="1" strokeDasharray="1.5 1.5" />
          <path
            d="M20 12 C18 15 15 17 12 20 C15 23 18 25 20 28 C22 25 25 23 28 20 C25 17 22 15 20 12 Z"
            fill="#5C3F0C"
            opacity="0.85"
          />
          <circle cx="20" cy="20" r="3.5" fill="#FFE29E" />
        </svg>
      </div>
    </div>
  );
}
