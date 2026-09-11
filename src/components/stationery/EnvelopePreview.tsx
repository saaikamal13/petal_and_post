"use client";

import React, { useState } from 'react';
import { useLetter } from '@/context/LetterContext';
import { BRAND } from '@/config/brand';
import { BotanicalArt, VintagePostmarkStamp } from './BotanicalArt';
import { WaxSeal } from './WaxSeal';
import { RotateCw, Eye } from 'lucide-react';

interface EnvelopePreviewProps {
  className?: string;
  showToggle?: boolean;
  defaultSide?: 'back' | 'front';
  onPeekLetter?: () => void;
}

export function EnvelopePreview({
  className = '',
  showToggle = true,
  defaultSide = 'back',
  onPeekLetter,
}: EnvelopePreviewProps) {
  const { draft } = useLetter();
  const [side, setSide] = useState<'back' | 'front'>(defaultSide);

  const activeColor = BRAND.envelopeColors.find(
    (c) => c.id === draft.customization.envelopeColor
  ) || BRAND.envelopeColors[0];

  const activeFlower = BRAND.flowers.find(
    (f) => f.id === draft.customization.flowerType
  );

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Side Toggle Control */}
      {showToggle && (
        <div className="flex items-center justify-between w-full max-w-[460px] mb-3 px-2">
          <div className="flex items-center gap-1.5 text-xs text-[#7A7369] font-serif">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeColor.hex }} />
            <span>{activeColor.name} Envelope</span>
          </div>

          <button
            type="button"
            onClick={() => setSide(s => s === 'back' ? 'front' : 'back')}
            className="inline-flex items-center gap-1.5 text-xs font-serif text-[#6B6358] hover:text-[#2A2724] bg-[#F2EDE4] hover:bg-[#EAE2D5] px-3 py-1 rounded-full border border-[#E0D6C8] transition-colors cursor-pointer"
          >
            <RotateCw className="w-3 h-3 text-[#C5A059]" />
            <span>Flip to {side === 'back' ? 'Address Side' : 'Seal Side'}</span>
          </button>
        </div>
      )}

      {/* Physical Envelope Shell */}
      <div
        className="relative w-full max-w-[460px] aspect-[1.55/1] rounded-sm p-4 sm:p-6 shadow-paper transition-all duration-500 overflow-hidden border"
        style={{
          backgroundColor: activeColor.hex,
          borderColor: activeColor.borderClass.replace('border-', ''),
        }}
      >
        {/* Subtle paper grain texture */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(0,0,0,0.06) 0.8px, transparent 0.8px)`,
            backgroundSize: '16px 16px',
          }}
        />

        {side === 'back' ? (
          /* ================= ENVELOPE BACK (FLAP, WAX SEAL, FLOWERS) ================= */
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Triangular Flap Lines */}
            <svg
              viewBox="0 0 460 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              {/* Bottom fold triangles */}
              <path
                d="M0 300 L230 160 L460 300 Z"
                fill="rgba(0, 0, 0, 0.02)"
                stroke="rgba(0, 0, 0, 0.05)"
                strokeWidth="1.2"
              />
              {/* Left fold */}
              <path
                d="M0 0 L180 150 L0 300 Z"
                fill="rgba(0, 0, 0, 0.015)"
                stroke="rgba(0, 0, 0, 0.04)"
                strokeWidth="1.2"
              />
              {/* Right fold */}
              <path
                d="M460 0 L280 150 L460 300 Z"
                fill="rgba(0, 0, 0, 0.015)"
                stroke="rgba(0, 0, 0, 0.04)"
                strokeWidth="1.2"
              />
              {/* Top main envelope flap */}
              <path
                d="M0 0 L230 165 L460 0 Z"
                fill="rgba(255, 255, 255, 0.2)"
                stroke="rgba(0, 0, 0, 0.07)"
                strokeWidth="1.5"
              />
              {/* Flap soft inner shadow */}
              <path
                d="M0 0 L230 165 L460 0"
                stroke="rgba(0, 0, 0, 0.08)"
                strokeWidth="2"
                fill="none"
              />
            </svg>

            {/* Dried Botanical Sprig Tucked Behind the Flap & Seal */}
            {draft.customization.flowersEnabled && (
              <div className="absolute -top-3 sm:-top-5 z-10 transition-all duration-500 transform hover:scale-105 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.12)]">
                <div className="relative">
                  <BotanicalArt
                    flowerType={draft.customization.flowerType}
                    className="w-20 h-28 sm:w-24 sm:h-36 object-contain"
                  />
                  <span className="sr-only">Tucked {activeFlower?.name}</span>
                </div>
              </div>
            )}

            {/* Golden Wax Seal: ONLY shown when enabled; NO seal appears when OFF */}
            {draft.customization.waxSealEnabled && (
              <div className="absolute top-[40%] sm:top-[43%] z-20 transition-transform duration-300 hover:scale-110">
                <WaxSeal size="md" />
              </div>
            )}

            {/* Discreet watermark brand badge at bottom */}
            <div className="absolute bottom-3 text-center text-[10px] uppercase tracking-widest font-serif text-[#7D7468]/50">
              {BRAND.shortName} · Confidential &amp; Sealed
            </div>
          </div>
        ) : (
          /* ================= ENVELOPE FRONT (RECIPIENT ADDRESS & STAMP) ================= */
          <div className="relative w-full h-full flex flex-col justify-between p-2">
            {/* Top row: Postage stamp & Airmail postmark */}
            <div className="flex justify-between items-start">
              {/* Sender anonymity mark */}
              <div className="text-[11px] font-serif text-[#6D6459] italic">
                {draft.sender.anonymityMode === 'anonymous' ? (
                  <span className="inline-flex items-center gap-1 bg-[#F2EDE4]/80 px-2 py-0.5 rounded border border-[#E0D6C8]">
                    <span>🔒</span> Anonymous Sender
                  </span>
                ) : draft.sender.anonymityMode === 'nickname' && draft.sender.nickname ? (
                  <span>From: {draft.sender.nickname}</span>
                ) : draft.sender.anonymityMode === 'realName' && draft.sender.realName ? (
                  <span>From: {draft.sender.realName}</span>
                ) : (
                  <span className="opacity-0">—</span>
                )}
              </div>

              {/* Vintage Postmark Stamp */}
              <VintagePostmarkStamp className="w-16 h-16 sm:w-20 sm:h-20 -mr-2 -mt-2" />
            </div>

            {/* Centered Hand-addressed Recipient Details (Campus Specific) */}
            <div className="my-auto pl-6 sm:pl-10 space-y-1">
              <div className="text-xs uppercase tracking-widest font-serif text-[#8C8377]">
                Deliver To:
              </div>
              <div className="font-serif text-lg sm:text-xl font-medium text-[#2A2724] tracking-wide">
                {draft.recipient.name || "Recipient Name"}
              </div>
              <div className="font-serif text-xs sm:text-sm text-[#4E473E] leading-relaxed">
                {draft.recipient.hostel && (
                  <div>{draft.recipient.hostel} {draft.recipient.roomNumber && `· ${draft.recipient.roomNumber}`}</div>
                )}
                {draft.recipient.department && (
                  <div className="text-[11px] text-[#6E665C]">
                    {draft.recipient.department} {draft.recipient.year && `(${draft.recipient.year})`}
                  </div>
                )}
              </div>
            </div>

            {/* Campus Express Tag */}
            <div className="flex items-center justify-between text-[10px] font-sans text-[#7D7468]/70 pt-2 border-t border-[#000000]/05">
              <span className="font-serif uppercase tracking-widest">Discreet Campus Delivery</span>
              <span>Campus Delivery</span>
            </div>
          </div>
        )}
      </div>

      {/* Auxiliary Peek or Features caption */}
      {onPeekLetter && (
        <button
          type="button"
          onClick={onPeekLetter}
          className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#6B6358] hover:text-[#2A2724] hover:underline cursor-pointer transition-colors"
        >
          <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Peek at letter contents</span>
        </button>
      )}
    </div>
  );
}
