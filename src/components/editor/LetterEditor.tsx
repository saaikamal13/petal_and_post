"use client";

import React, { useState } from 'react';
import { useLetter } from '@/context/LetterContext';
import { LetterPaper } from '@/components/stationery/LetterPaper';
import { EnvelopePreview } from '@/components/stationery/EnvelopePreview';
import { FlowerSelector } from './FlowerSelector';
import { WaxSealSelector } from './WaxSealSelector';
import { EnvelopeSelector } from './EnvelopeSelector';
import { WritingStyleSelector } from './WritingStyleSelector';
import { ArrowRight, Eye, PenLine } from 'lucide-react';
import Link from 'next/link';

export function LetterEditor() {
  const { pricing } = useLetter();
  const [mobileTab, setMobileTab] = useState<'letter' | 'envelope'>('letter');

  return (
    <div className="w-full">
      {/* Mobile View Switcher (Letter vs Envelope Preview) */}
      <div className="lg:hidden flex items-center justify-center mb-6">
        <div className="inline-flex rounded-full bg-[#EFE8DC] p-1 border border-[#DFD5C7]">
          <button
            type="button"
            onClick={() => setMobileTab('letter')}
            className={`px-5 py-1.5 rounded-full text-xs font-serif transition-all cursor-pointer ${
              mobileTab === 'letter'
                ? 'bg-white text-[#2A2724] font-medium shadow-xs'
                : 'text-[#6D6457] hover:text-[#2A2724]'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <PenLine className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Letter Paper</span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('envelope')}
            className={`px-5 py-1.5 rounded-full text-xs font-serif transition-all cursor-pointer ${
              mobileTab === 'envelope'
                ? 'bg-white text-[#2A2724] font-medium shadow-xs'
                : 'text-[#6D6457] hover:text-[#2A2724]'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Envelope Preview</span>
            </span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT / CENTER: LETTER PAPER & LIVE CANVAS */}
        <div
          className={`lg:col-span-7 flex flex-col items-center justify-start space-y-6 ${
            mobileTab === 'envelope' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Header guidance */}
          <div className="w-full max-w-[660px] flex items-center justify-between px-2">
            <div className="text-xs font-serif text-[#7D7468]">
              Physical stationery representation
            </div>
          </div>

          {/* Realistic Paper */}
          <LetterPaper />
        </div>

        {/* RIGHT: CUSTOMIZATION PANEL ("Make it special") */}
        <div
          className={`lg:col-span-5 space-y-8 ${
            mobileTab === 'letter' ? 'hidden lg:block' : 'block'
          }`}
        >
          {/* Envelope Live Preview Card on Desktop */}
          <div className="bg-[#FAF7F2] border border-[#E5DDD2] rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#EAE2D7] pb-2.5">
              <span className="text-xs font-serif uppercase tracking-widest text-[#8C8377]">
                Live Envelope Preview
              </span>
              <span className="text-[11px] font-serif text-[#C5A059] italic">
                Updates in real-time
              </span>
            </div>

            <EnvelopePreview />
          </div>

          {/* Make it special Customization Options */}
          <div className="bg-white/80 border border-[#E5DDD2] rounded-xl p-6 sm:p-7 shadow-xs space-y-8">
            <div className="border-b border-[#EAE2D7] pb-3">
              <span className="text-xs font-serif uppercase tracking-widest text-[#C5A059] block mb-1">
                Customization Studio
              </span>
              <h3 className="font-serif text-2xl text-[#2A2724]">
                Make It Special
              </h3>
              <p className="text-xs text-[#7A7369] mt-0.5">
                Every detail is hand-assembled before physical dispatch.
              </p>
            </div>

            {/* 1. Writing Style */}
            <WritingStyleSelector />

            <div className="h-px bg-[#EAE2D7]" />

            {/* 2. Envelope Selection */}
            <EnvelopeSelector />

            <div className="h-px bg-[#EAE2D7]" />

            {/* 3. Flowers Selection */}
            <FlowerSelector />

            <div className="h-px bg-[#EAE2D7]" />

            {/* 4. Golden Wax Seal Selection */}
            <WaxSealSelector />
          </div>

          {/* Sticky Continue Bar on Desktop */}
          <div className="sticky bottom-6 z-30 bg-[#FAF7F2]/95 backdrop-blur-md p-4 rounded-xl border border-[#E5DDD2] shadow-lg flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-serif uppercase tracking-wider text-[#8C8377]">
                Current Total
              </div>
              <div className="text-xl font-serif font-semibold text-[#2A2724]">
                ₹{pricing.total}
              </div>
            </div>

            <Link
              href="/recipient"
              className="inline-flex items-center gap-2 bg-[#2A2724] hover:bg-[#3E3A35] text-[#FDFBF7] px-6 py-2.5 rounded-full font-serif text-sm transition-all shadow-sm hover:shadow cursor-pointer"
            >
              <span>Continue to Delivery</span>
              <ArrowRight className="w-4 h-4 text-[#DFC081]" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
