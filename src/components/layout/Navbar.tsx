"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BRAND } from '@/config/brand';
import { Menu, X } from 'lucide-react';
import { HowItWorksModal } from '@/components/modals/HowItWorksModal';
import { CampusFaqModal } from '@/components/modals/CampusFaqModal';

export function Navbar() {
  const pathname = usePathname();
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isWritingFlow = pathname === '/write' || pathname === '/recipient' || pathname === '/review';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E8E0D4] shadow-[0_1px_12px_rgba(42,39,36,0.06)]'
            : 'bg-[#FDFBF7]/90 backdrop-blur-sm border-b border-[#EDE5DB]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-[60px] flex items-center justify-between">

          {/* ── Brand Logotype ── */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Petal & Post — Home"
          >
            {/* Ornament mark */}
            <span
              className="text-[#C5A059] text-lg leading-none select-none transition-transform duration-500 group-hover:rotate-12"
              aria-hidden="true"
            >
              ✦
            </span>
            <span className="font-serif text-[17px] tracking-[0.01em] text-[#2A2724] font-medium">
              {BRAND.name}
            </span>
          </Link>

          {/* ── Desktop Navigation ── */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">

            <button
              type="button"
              onClick={() => setIsHowItWorksOpen(true)}
              className="px-4 py-2 font-serif text-[13px] text-[#5C5449] hover:text-[#2A2724] transition-colors relative after:absolute after:bottom-1 after:left-4 after:right-4 after:h-px after:bg-[#C5A059] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left cursor-pointer"
            >
              How It Works
            </button>

            <Link
              href="/track"
              className="px-4 py-2 font-serif text-[13px] text-[#5C5449] hover:text-[#2A2724] transition-colors relative after:absolute after:bottom-1 after:left-4 after:right-4 after:h-px after:bg-[#C5A059] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
            >
              Track a Letter
            </Link>

            {/* Thin separator */}
            <div className="mx-3 h-4 w-px bg-[#E0D6C8]" aria-hidden="true" />

            <Link
              href="/write"
              className="inline-flex items-center gap-2 bg-[#2A2724] hover:bg-[#3E3A35] text-[#F0EBE0] px-5 py-2 font-serif text-[13px] tracking-wide transition-all duration-200 shadow-sm hover:shadow-md"
              style={{ borderRadius: '3px' }}
            >
              <span>{isWritingFlow ? 'Back to Letter' : 'Write a Letter'}</span>
              <span className="text-[#C5A059] text-sm" aria-hidden="true">→</span>
            </Link>
          </nav>

          {/* ── Mobile Controls ── */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/write"
              className="font-serif text-[13px] text-[#5C5449] hover:text-[#2A2724] transition-colors"
            >
              Write
            </Link>
            <span className="text-[#D0C7BC]" aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              className="p-2 text-[#665E54] hover:text-[#2A2724] transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#FDFBF7] border-t border-[#EDE5DB]">
            <nav className="max-w-7xl mx-auto px-5 py-5 space-y-0.5" aria-label="Mobile navigation">
              <button
                type="button"
                onClick={() => { setIsHowItWorksOpen(true); setIsMobileMenuOpen(false); }}
                className="w-full text-left py-3 font-serif text-base text-[#4E473E] hover:text-[#2A2724] border-b border-[#EDE5DB] cursor-pointer"
              >
                How It Works
              </button>
              <button
                type="button"
                onClick={() => { setIsFaqOpen(true); setIsMobileMenuOpen(false); }}
                className="w-full text-left py-3 font-serif text-base text-[#4E473E] hover:text-[#2A2724] border-b border-[#EDE5DB] cursor-pointer"
              >
                Campus Delivery FAQ
              </button>
              <Link
                href="/track"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 font-serif text-base text-[#4E473E] hover:text-[#2A2724] border-b border-[#EDE5DB]"
              >
                Track a Letter
              </Link>
              <div className="pt-4">
                <Link
                  href="/write"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#2A2724] text-[#F0EBE0] font-serif text-sm"
                  style={{ borderRadius: '3px' }}
                >
                  <span>Write a Letter</span>
                  <span className="text-[#C5A059]">→</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Modals */}
      <HowItWorksModal isOpen={isHowItWorksOpen} onClose={() => setIsHowItWorksOpen(false)} />
      <CampusFaqModal isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} />
    </>
  );
}
