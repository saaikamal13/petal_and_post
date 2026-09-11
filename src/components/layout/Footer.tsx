"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { BRAND } from '@/config/brand';
import { HowItWorksModal } from '@/components/modals/HowItWorksModal';
import { CampusFaqModal } from '@/components/modals/CampusFaqModal';

export function Footer() {
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  return (
    <footer className="w-full bg-[#F3ECE2] border-t border-[#DDD0BB] pt-16 pb-10 text-[#4D463D]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* ── Main Footer Body ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#DDD0BB]">

          {/* Brand Column (wider) */}
          <div className="md:col-span-7 space-y-6">
            {/* Logotype */}
            <div className="flex items-center gap-3">
              <span className="text-[#C5A059] text-lg" aria-hidden="true">✦</span>
              <span className="font-serif text-xl tracking-[0.01em] text-[#2A2724] font-medium">
                {BRAND.name}
              </span>
            </div>

            {/* Large editorial tagline */}
            <p className="font-serif italic text-2xl sm:text-3xl text-[#3E3732] leading-[1.3] max-w-sm">
              &ldquo;Letters, made personal.&rdquo;
            </p>

            {/* Sub-line */}
            <p className="font-serif text-sm text-[#6B6358] leading-relaxed max-w-xs">
              Handwritten on premium paper, pressed with real dried botanicals, and delivered discreetly across VIT Chennai.
            </p>

            {/* Campus badge */}
            <div className="inline-flex items-center gap-2">
              <div className="h-px w-6 bg-[#C5A059]" aria-hidden="true" />
              <span className="label-sm-caps text-[#7A7058] tracking-[0.2em]">
                VIT Chennai · Campus Delivery
              </span>
            </div>
          </div>

          {/* Links Column */}
          <div className="md:col-span-5 grid grid-cols-2 gap-8 md:pt-2">

            <div className="space-y-4">
              <h4 className="label-sm-caps text-[#2A2724] tracking-[0.15em]">
                Explore
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/write" className="font-serif text-sm text-[#665E54] hover:text-[#2A2724] transition-colors ink-underline-hover">
                    Write a Letter
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setIsHowItWorksOpen(true)}
                    className="font-serif text-sm text-[#665E54] hover:text-[#2A2724] transition-colors text-left cursor-pointer"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <Link href="/track" className="font-serif text-sm text-[#665E54] hover:text-[#2A2724] transition-colors">
                    Track a Letter
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="label-sm-caps text-[#2A2724] tracking-[0.15em]">
                Policies
              </h4>
              <ul className="space-y-3">
                <li>
                  <button
                    type="button"
                    onClick={() => setIsFaqOpen(true)}
                    className="font-serif text-sm text-[#665E54] hover:text-[#2A2724] transition-colors text-left cursor-pointer"
                  >
                    Campus FAQ
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setIsFaqOpen(true)}
                    className="font-serif text-sm text-[#665E54] hover:text-[#2A2724] transition-colors text-left cursor-pointer"
                  >
                    Privacy Commitment
                  </button>
                </li>
                <li>
                  <span className="font-serif text-xs text-[#8A8075]">
                    letters@petalandpost.in
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Footer Bottom ── */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-serif text-xs text-[#7A7369]">
            © {new Date().getFullYear()} {BRAND.name}. Hand-pressed with care.
          </p>
          <p className="font-serif text-xs italic text-[#9A9087]">
            Some words deserve paper.
          </p>
        </div>
      </div>

      <HowItWorksModal isOpen={isHowItWorksOpen} onClose={() => setIsHowItWorksOpen(false)} />
      <CampusFaqModal isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} />
    </footer>
  );
}
