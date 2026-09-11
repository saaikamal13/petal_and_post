import React from 'react';

interface BotanicalProps {
  className?: string;
  flowerType?: 'babys-breath' | 'rose' | 'daisy' | 'tulip' | 'mixed-bouquet';
}

export function BabysBreathArt({ className = "w-16 h-24" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Central slender stem */}
      <path d="M50 135 C 50 95, 48 60, 52 25" stroke="#7E8B75" strokeWidth="1.8" strokeLinecap="round" />
      
      {/* Branching twigs */}
      <path d="M50 100 C 42 85, 30 75, 22 68" stroke="#899780" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M22 68 C 16 62, 14 52, 12 45" stroke="#899780" strokeWidth="1" strokeLinecap="round" />
      <path d="M22 68 C 24 58, 28 50, 32 44" stroke="#899780" strokeWidth="1" strokeLinecap="round" />
      
      <path d="M49 82 C 58 72, 70 65, 78 58" stroke="#899780" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M78 58 C 84 52, 88 42, 90 35" stroke="#899780" strokeWidth="1" strokeLinecap="round" />
      <path d="M78 58 C 74 48, 70 40, 68 32" stroke="#899780" strokeWidth="1" strokeLinecap="round" />

      <path d="M51 55 C 45 42, 38 35, 34 25" stroke="#899780" strokeWidth="1" strokeLinecap="round" />
      <path d="M52 40 C 56 30, 62 24, 66 18" stroke="#899780" strokeWidth="1" strokeLinecap="round" />
      <path d="M52 25 C 50 18, 48 14, 50 8" stroke="#899780" strokeWidth="1" strokeLinecap="round" />

      {/* Delicate white florets */}
      <circle cx="12" cy="44" r="3.5" fill="#FAF7F2" stroke="#D3CDC2" strokeWidth="0.8" />
      <circle cx="12" cy="44" r="1" fill="#E8D5B5" />

      <circle cx="32" cy="43" r="3" fill="#FAF7F2" stroke="#D3CDC2" strokeWidth="0.8" />
      <circle cx="32" cy="43" r="1" fill="#E8D5B5" />

      <circle cx="21" cy="56" r="2.8" fill="#FAF7F2" stroke="#D3CDC2" strokeWidth="0.8" />

      <circle cx="90" cy="34" r="3.5" fill="#FAF7F2" stroke="#D3CDC2" strokeWidth="0.8" />
      <circle cx="90" cy="34" r="1" fill="#E8D5B5" />

      <circle cx="68" cy="31" r="3.2" fill="#FAF7F2" stroke="#D3CDC2" strokeWidth="0.8" />
      <circle cx="68" cy="31" r="1" fill="#E8D5B5" />

      <circle cx="80" cy="46" r="2.5" fill="#FAF7F2" stroke="#D3CDC2" strokeWidth="0.8" />

      <circle cx="34" cy="24" r="3.5" fill="#FAF7F2" stroke="#D3CDC2" strokeWidth="0.8" />
      <circle cx="34" cy="24" r="1" fill="#E8D5B5" />

      <circle cx="66" cy="17" r="3.5" fill="#FAF7F2" stroke="#D3CDC2" strokeWidth="0.8" />
      <circle cx="66" cy="17" r="1" fill="#E8D5B5" />

      <circle cx="50" cy="8" r="4" fill="#FAF7F2" stroke="#D3CDC2" strokeWidth="0.8" />
      <circle cx="50" cy="8" r="1.2" fill="#E8D5B5" />
    </svg>
  );
}

export function RoseArt({ className = "w-16 h-24" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Rose stem */}
      <path d="M50 135 C 50 100, 48 70, 50 48" stroke="#66775E" strokeWidth="2" strokeLinecap="round" />
      
      {/* Soft thorns */}
      <path d="M49 105 Q 43 103, 44 100" stroke="#66775E" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M51 85 Q 57 83, 56 80" stroke="#66775E" strokeWidth="1.2" strokeLinecap="round" />

      {/* Leaves */}
      <path d="M49 92 C 40 90, 32 80, 30 72 C 38 72, 45 80, 49 92 Z" fill="#8FA684" stroke="#66775E" strokeWidth="0.8" />
      <path d="M51 72 C 60 70, 68 62, 70 54 C 62 55, 55 63, 51 72 Z" fill="#8FA684" stroke="#66775E" strokeWidth="0.8" />

      {/* Calyx & Rose Bud / Petals */}
      <path d="M46 50 C 44 54, 42 58, 40 60 C 45 56, 48 52, 49 48" fill="#66775E" />
      <path d="M54 50 C 56 54, 58 58, 60 60 C 55 56, 52 52, 51 48" fill="#66775E" />

      {/* Pressed rose petals layers */}
      <ellipse cx="50" cy="36" rx="16" ry="18" fill="#DF8A88" opacity="0.85" />
      <path d="M40 38 C 36 28, 44 20, 50 20 C 56 20, 64 28, 60 38 C 55 45, 45 45, 40 38 Z" fill="#D36B69" />
      <path d="M43 32 C 43 25, 47 22, 50 22 C 54 22, 57 26, 56 32 C 55 37, 45 37, 43 32 Z" fill="#B84947" />
      <path d="M47 28 C 47 25, 49 24, 50 24 C 52 24, 53 26, 53 28 C 52 30, 48 30, 47 28 Z" fill="#8C2C2B" />
      
      {/* Outer delicate petals */}
      <path d="M34 35 C 32 40, 36 46, 42 47 C 37 44, 35 39, 34 35 Z" fill="#E89B99" opacity="0.9" />
      <path d="M66 35 C 68 40, 64 46, 58 47 C 63 44, 65 39, 66 35 Z" fill="#E89B99" opacity="0.9" />
    </svg>
  );
}

export function DaisyArt({ className = "w-16 h-24" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Stem */}
      <path d="M50 135 C 52 100, 49 70, 50 48" stroke="#7A8F70" strokeWidth="1.8" strokeLinecap="round" />
      
      {/* Feathery leaves */}
      <path d="M50 95 C 42 92, 36 84, 33 76 C 40 78, 46 86, 50 95 Z" fill="#8B9F80" stroke="#7A8F70" strokeWidth="0.8" />
      <path d="M50 80 C 58 78, 64 70, 67 62 C 60 64, 54 72, 50 80 Z" fill="#8B9F80" stroke="#7A8F70" strokeWidth="0.8" />

      {/* Daisy petals arranged radially */}
      <g transform="translate(50, 38)">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
          <path
            key={i}
            d="M-3 -8 C -4 -18, -2 -24, 0 -25 C 2 -24, 4 -18, 3 -8 C 2 -4, -2 -4, -3 -8 Z"
            fill="#FAF8F5"
            stroke="#D8D0C3"
            strokeWidth="0.7"
            transform={`rotate(${angle})`}
          />
        ))}
        {/* Golden seed center */}
        <circle cx="0" cy="0" r="7.5" fill="#E4AE41" stroke="#BA8621" strokeWidth="1" />
        <circle cx="0" cy="0" r="5" fill="#F4C75F" />
        <circle cx="-2" cy="-2" r="1" fill="#FFF2D1" />
      </g>
    </svg>
  );
}

export function TulipArt({ className = "w-16 h-24" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Stem */}
      <path d="M50 135 C 49 98, 51 68, 50 48" stroke="#6F8867" strokeWidth="2.2" strokeLinecap="round" />
      
      {/* Broad smooth tulip leaf */}
      <path d="M49 110 C 35 90, 30 65, 34 45 C 40 60, 46 85, 49 110 Z" fill="#8DA685" stroke="#6F8867" strokeWidth="0.8" />
      <path d="M51 95 C 64 80, 68 58, 64 40 C 60 55, 54 78, 51 95 Z" fill="#829C7A" stroke="#6F8867" strokeWidth="0.8" />

      {/* Tulip cup petals */}
      <g transform="translate(50, 34)">
        {/* Back petal */}
        <path d="M-6 8 C -8 -10, -5 -22, 0 -24 C 5 -22, 8 -10, 6 8 Z" fill="#E78E89" opacity="0.9" />
        {/* Left main petal */}
        <path d="M-14 6 C -18 -8, -12 -20, -5 -22 C -2 -14, -2 0, -5 10 C -9 10, -12 8, -14 6 Z" fill="#F2A4A0" stroke="#DF847F" strokeWidth="0.6" />
        {/* Right main petal */}
        <path d="M14 6 C 18 -8, 12 -20, 5 -22 C 2 -14, 2 0, 5 10 C 9 10, 12 8, 14 6 Z" fill="#EAA09C" stroke="#DF847F" strokeWidth="0.6" />
        {/* Front center petal */}
        <path d="M-8 8 C -10 -6, -6 -18, 0 -20 C 6 -18, 10 -6, 8 8 C 4 12, -4 12, -8 8 Z" fill="#F6B2AF" stroke="#E39490" strokeWidth="0.6" />
      </g>
    </svg>
  );
}

export function MixedBouquetArt({ className = "w-16 h-24" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Wrapped stems */}
      <path d="M50 135 C 50 115, 46 95, 44 80" stroke="#728469" strokeWidth="1.6" />
      <path d="M52 135 C 52 115, 54 95, 56 80" stroke="#63765A" strokeWidth="1.6" />
      <path d="M51 135 C 51 115, 50 95, 50 80" stroke="#84967C" strokeWidth="1.6" />

      {/* Ribbon / Twine tie */}
      <rect x="42" y="96" width="16" height="7" rx="2" fill="#BFA98A" stroke="#9A8364" strokeWidth="0.8" />
      <path d="M46 103 Q 42 112, 38 120" stroke="#9A8364" strokeWidth="1" strokeLinecap="round" />
      <path d="M54 103 Q 58 114, 60 122" stroke="#9A8364" strokeWidth="1" strokeLinecap="round" />

      {/* Eucalyptus sprig on left */}
      <path d="M44 80 C 35 65, 26 50, 24 35" stroke="#778D74" strokeWidth="1.2" strokeLinecap="round" />
      <ellipse cx="28" cy="60" rx="5" ry="3.5" transform="rotate(-25 28 60)" fill="#94A991" stroke="#778D74" strokeWidth="0.6" />
      <ellipse cx="23" cy="46" rx="4.5" ry="3" transform="rotate(-30 23 46)" fill="#94A991" stroke="#778D74" strokeWidth="0.6" />
      <ellipse cx="24" cy="34" rx="3.5" ry="2.5" transform="rotate(-35 24 34)" fill="#94A991" stroke="#778D74" strokeWidth="0.6" />

      {/* Lavender stalk on right */}
      <path d="M56 80 C 64 65, 72 50, 76 32" stroke="#6B7E67" strokeWidth="1.2" strokeLinecap="round" />
      {[36, 44, 52, 60].map((y, idx) => (
        <g key={idx}>
          <ellipse cx={72 - idx * 2} cy={y} rx="3" ry="2" transform={`rotate(15 ${72 - idx * 2} ${y})`} fill="#9E94B8" />
          <ellipse cx={77 - idx * 2} cy={y - 2} rx="3" ry="2" transform={`rotate(-15 ${77 - idx * 2} ${y - 2})`} fill="#B3A9CC" />
        </g>
      ))}

      {/* Center Rose Petal Bud */}
      <ellipse cx="50" cy="50" rx="10" ry="12" fill="#E08B89" />
      <path d="M44 52 C 41 44, 46 38, 50 38 C 54 38, 59 44, 56 52 Z" fill="#C4605E" />
      <path d="M46 48 C 47 43, 49 41, 50 41 C 52 41, 53 43, 53 48 Z" fill="#993836" />

      {/* Delicate baby's breath florets dancing around */}
      <circle cx="36" cy="38" r="2" fill="#FAF8F5" stroke="#CFC7B9" strokeWidth="0.6" />
      <circle cx="42" cy="28" r="2.2" fill="#FAF8F5" stroke="#CFC7B9" strokeWidth="0.6" />
      <circle cx="58" cy="26" r="2" fill="#FAF8F5" stroke="#CFC7B9" strokeWidth="0.6" />
      <circle cx="64" cy="35" r="2.2" fill="#FAF8F5" stroke="#CFC7B9" strokeWidth="0.6" />
    </svg>
  );
}

export function BotanicalArt({ flowerType, className = "w-16 h-24" }: BotanicalProps) {
  switch (flowerType) {
    case 'babys-breath':
      return <BabysBreathArt className={className} />;
    case 'rose':
      return <RoseArt className={className} />;
    case 'daisy':
      return <DaisyArt className={className} />;
    case 'tulip':
      return <TulipArt className={className} />;
    case 'mixed-bouquet':
      return <MixedBouquetArt className={className} />;
    default:
      return <BabysBreathArt className={className} />;
  }
}

export function VintagePostmarkStamp({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-60">
        <circle cx="50" cy="50" r="46" stroke="#9E7D3A" strokeWidth="1.2" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="41" stroke="#9E7D3A" strokeWidth="0.8" />
        
        {/* Curving text simulated */}
        <path id="curve" d="M 20 50 A 30 30 0 0 1 80 50" fill="transparent" />
        <text className="text-[7.5px] uppercase tracking-widest fill-[#9E7D3A] font-serif font-semibold">
          <textPath href="#curve" startOffset="50%" textAnchor="middle">
            Petal & Post
          </textPath>
        </text>

        <path id="curve-bottom" d="M 80 50 A 30 30 0 0 1 20 50" fill="transparent" />
        <text className="text-[6.5px] uppercase tracking-wider fill-[#9E7D3A] font-sans">
          <textPath href="#curve-bottom" startOffset="50%" textAnchor="middle">
            Campus Express
          </textPath>
        </text>

        {/* Center botanical sprig */}
        <path d="M50 35 Q 50 65, 50 65" stroke="#9E7D3A" strokeWidth="1" strokeLinecap="round" />
        <ellipse cx="46" cy="45" rx="3" ry="1.8" transform="rotate(-30 46 45)" fill="#9E7D3A" opacity="0.7" />
        <ellipse cx="54" cy="53" rx="3" ry="1.8" transform="rotate(30 54 53)" fill="#9E7D3A" opacity="0.7" />
      </svg>
    </div>
  );
}
