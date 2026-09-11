"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BRAND } from '@/config/brand';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BotanicalArt, VintagePostmarkStamp } from '@/components/stationery/BotanicalArt';
import { WaxSeal } from '@/components/stationery/WaxSeal';
import { HowItWorksModal } from '@/components/modals/HowItWorksModal';
import {
  Heart,
  ArrowRight,
  Sparkles,
  PenLine,
  Send,
  MapPin,
  ShieldCheck,
  Feather,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  const handleCardClick = () => {
    router.push('/write');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2A2724]">
      <Navbar />

      <main className="flex-1">
        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 overflow-hidden">
          {/* Subtle Ambient Botanical Watermarks in Background */}
          <div className="absolute top-10 left-4 sm:left-12 opacity-25 pointer-events-none select-none">
            <BotanicalArt flowerType="babys-breath" className="w-32 h-44 sm:w-44 sm:h-60" />
          </div>
          <div className="absolute bottom-6 right-4 sm:right-12 opacity-20 pointer-events-none select-none">
            <BotanicalArt flowerType="rose" className="w-36 h-48 sm:w-48 sm:h-64" />
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              {/* Subtle top badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF7F2] border border-[#E8E0D4] text-xs font-serif text-[#8C8377] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                <span>Anonymous Physical Letter Delivery for College Campuses</span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#2A2724] tracking-tight leading-[1.15] mb-6">
                Some things are better said on paper.
              </h1>

              {/* Supporting Text */}
              <p className="font-serif text-base sm:text-lg text-[#61584D] leading-relaxed max-w-xl mx-auto mb-8">
                Write something meaningful for someone you love. We&apos;ll turn your words into a physical letter they can hold onto.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/write"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#2A2724] hover:bg-[#3E3A35] text-[#FDFBF7] px-8 py-3.5 rounded-full font-serif text-base transition-all shadow-sm hover:shadow-md cursor-pointer group"
                >
                  <Heart className="w-4 h-4 text-[#E5B8AE] group-hover:scale-110 transition-transform" />
                  <span>Start Writing</span>
                  <ArrowRight className="w-4 h-4 text-[#DFC081] group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={() => setIsHowItWorksOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-serif text-base text-[#5C5449] hover:text-[#2A2724] bg-[#F2EDE4] hover:bg-[#EAE2D5] px-7 py-3.5 rounded-full border border-[#E0D6C8] transition-colors cursor-pointer"
                >
                  <span>How It Works</span>
                </button>
                <Link
                  href="/track"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-serif text-base text-[#5C5449] hover:text-[#2A2724] px-5 py-3.5 rounded-full transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[#C5A059]" />
                  <span>Check Order Status</span>
                </Link>
              </div>
            </div>

            {/* ================= HERO COMPOSITION ================= */}
            {/* Elegant physical stationery composition: Envelope, handwritten letter, dried flowers, golden wax seal */}
            <div className="relative max-w-3xl mx-auto pt-6 pb-2 px-2">
              <div className="relative rounded-2xl p-6 sm:p-10 bg-radial from-[#FAF7F2] via-[#F6F0E7] to-[#EDE5D8] border border-[#E5DDD2] shadow-[0_20px_50px_-15px_rgba(42,39,36,0.12)]">
                {/* Vintage Postmark Stamp top right */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 pointer-events-none select-none">
                  <VintagePostmarkStamp className="w-20 h-20 sm:w-24 sm:h-24" />
                </div>

                {/* Layered arrangement: Behind is the open letter, in front is the folded envelope */}
                <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-6">
                  {/* Handwritten Letter Preview */}
                  <div
                    className="w-full max-w-sm rounded-sm bg-[#FAF7F2] p-5 sm:p-6 border border-[#E6DDD0] shadow-md transform -rotate-2 hover:rotate-0 transition-transform duration-500"
                    style={{
                      backgroundImage: `radial-gradient(#E8E0D5 0.7px, #FAF7F2 0.7px)`,
                      backgroundSize: '20px 20px',
                    }}
                  >
                    <div className="flex items-center justify-between border-b border-[#EAE2D7] pb-2 mb-3">
                      <span className="font-serif italic text-xs text-[#8C8377]">
                        A Quiet Note
                      </span>
                      <span className="font-serif text-[11px] text-[#A89E90]">
                        Pressed Paper
                      </span>
                    </div>

                    <div className="font-serif text-sm font-medium text-[#2A2724] mb-2">
                      Spill your heart…
                    </div>

                    <div className="h-20" />
                  </div>

                  {/* Envelope with Dried Botanical Sprig and Golden Wax Seal */}
                  <div className="relative w-full max-w-xs aspect-[1.5/1] rounded-sm bg-[#F8ECE9] border border-[#EAD5D0] shadow-xl p-4 flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    {/* Flap triangle */}
                    <svg viewBox="0 0 300 200" fill="none" className="absolute inset-0 w-full h-full pointer-events-none">
                      <path d="M0 0 L150 110 L300 0 Z" fill="rgba(255,255,255,0.3)" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
                      <path d="M0 200 L150 100 L300 200 Z" fill="rgba(0,0,0,0.02)" stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
                    </svg>

                    {/* Dried Flowers Tucked under the flap */}
                    <div className="absolute -top-6 z-10 filter drop-shadow-md">
                      <BotanicalArt flowerType="babys-breath" className="w-16 h-28" />
                    </div>

                    {/* Golden Wax Seal */}
                    <div className="absolute top-[40%] z-20">
                      <WaxSeal size="md" />
                    </div>

                    {/* Envelope watermark */}
                    <div className="absolute bottom-2 text-center text-[9px] uppercase tracking-widest font-serif text-[#8C8377]/60">
                      {BRAND.name} · Hand Delivered
                    </div>
                  </div>
                </div>

                {/* Subtle reassurance footer bar */}
                <div className="mt-8 pt-4 border-t border-[#E5DDD2]/70 flex flex-wrap items-center justify-center gap-6 text-xs font-serif text-[#7E7569]">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#7A9A84]" />
                    <span>100% Anonymous sender option</span>
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#D0C7BC]" />
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Genuine dried pressed florals</span>
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#D0C7BC]" />
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Hand-delivered within VIT Chennai</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION: MAKE SOMEONE'S DAY ================= */}
        <section className="py-20 bg-[#F6F1EA]/70 border-y border-[#EAE2D7]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-14">
              <span className="text-xs font-serif uppercase tracking-widest text-[#C5A059] block mb-1">
                Heartfelt Occasions
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2A2724]">
                Make someone&apos;s day.
              </h2>
              <p className="font-serif text-sm sm:text-base text-[#6E655A] mt-2">
                Click any prompt to open the stationery editor with thoughtful words ready to shape.
              </p>
            </div>

            {/* Four Emotional Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <button
                type="button"
                onClick={handleCardClick}
                className="group p-6 rounded-xl bg-[#FAF7F2] border border-[#E5DDD2] hover:border-[#C5A059] shadow-xs hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#FCF8EE] border border-[#E6D4AA] flex items-center justify-center text-[#C5A059] mb-4 group-hover:scale-105 transition-transform">
                    <Heart className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl text-[#2A2724] mb-2 leading-snug">
                    Tell someone you miss them.
                  </h3>
                  <p className="text-xs text-[#736B60] leading-relaxed font-sans">
                    Distance and busy semesters feel smaller when your thoughts are physically held in their hands.
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#EAE2D7] flex items-center justify-between text-xs font-serif text-[#C5A059] group-hover:text-[#946C1E]">
                  <span>Write this letter</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Card 2 */}
              <button
                type="button"
                onClick={handleCardClick}
                className="group p-6 rounded-xl bg-[#FAF7F2] border border-[#E5DDD2] hover:border-[#C5A059] shadow-xs hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#FCF8EE] border border-[#E6D4AA] flex items-center justify-center text-[#C5A059] mb-4 group-hover:scale-105 transition-transform">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl text-[#2A2724] mb-2 leading-snug">
                    Say thank you.
                  </h3>
                  <p className="text-xs text-[#736B60] leading-relaxed font-sans">
                    For the senior, friend, or roommate whose quiet support helped you survive the hardest days.
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#EAE2D7] flex items-center justify-between text-xs font-serif text-[#C5A059] group-hover:text-[#946C1E]">
                  <span>Write this letter</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Card 3 */}
              <button
                type="button"
                onClick={handleCardClick}
                className="group p-6 rounded-xl bg-[#FAF7F2] border border-[#E5DDD2] hover:border-[#C5A059] shadow-xs hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#FCF8EE] border border-[#E6D4AA] flex items-center justify-center text-[#C5A059] mb-4 group-hover:scale-105 transition-transform">
                    <Feather className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl text-[#2A2724] mb-2 leading-snug">
                    Celebrate something special.
                  </h3>
                  <p className="text-xs text-[#736B60] leading-relaxed font-sans">
                    Birthdays, placement triumphs, or quiet milestones worth keeping in a box of memories.
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#EAE2D7] flex items-center justify-between text-xs font-serif text-[#C5A059] group-hover:text-[#946C1E]">
                  <span>Write this letter</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Card 4 */}
              <button
                type="button"
                onClick={handleCardClick}
                className="group p-6 rounded-xl bg-[#FAF7F2] border border-[#E5DDD2] hover:border-[#C5A059] shadow-xs hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#FCF8EE] border border-[#E6D4AA] flex items-center justify-center text-[#C5A059] mb-4 group-hover:scale-105 transition-transform">
                    <Send className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl text-[#2A2724] mb-2 leading-snug">
                    Say what you&apos;ve never been able to say.
                  </h3>
                  <p className="text-xs text-[#736B60] leading-relaxed font-sans">
                    Honest, vulnerable, and completely anonymous if you choose. Safe words that heal.
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#EAE2D7] flex items-center justify-between text-xs font-serif text-[#C5A059] group-hover:text-[#946C1E]">
                  <span>Write this letter</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* ================= SECTION: HOW IT WORKS ================= */}
        <section className="py-20 bg-[#FDFBF7]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="text-xs font-serif uppercase tracking-widest text-[#C5A059] block mb-1">
                The Process
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2A2724]">
                How it works
              </h2>
              <p className="font-serif text-sm sm:text-base text-[#6E655A] mt-2">
                Four simple steps from your browser to them within VIT Chennai.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Step 01 */}
              <div className="relative p-6 rounded-xl bg-[#FAF7F2] border border-[#E5DDD2] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-2xl font-bold text-[#C5A059]">01</span>
                    <PenLine className="w-5 h-5 text-[#8C8377]" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[#2A2724] mb-2">
                    Write
                  </h3>
                  <p className="text-xs sm:text-sm text-[#635A4F] leading-relaxed">
                    Write your letter online. Type freely in our tranquil digital stationery editor.
                  </p>
                </div>
              </div>

              {/* Step 02 */}
              <div className="relative p-6 rounded-xl bg-[#FAF7F2] border border-[#E5DDD2] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-2xl font-bold text-[#C5A059]">02</span>
                    <Sparkles className="w-5 h-5 text-[#8C8377]" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[#2A2724] mb-2">
                    Make it yours
                  </h3>
                  <p className="text-xs sm:text-sm text-[#635A4F] leading-relaxed">
                    Choose your writing style, envelope, flowers and seal.
                  </p>
                </div>
              </div>

              {/* Step 03 */}
              <div className="relative p-6 rounded-xl bg-[#FAF7F2] border border-[#E5DDD2] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-2xl font-bold text-[#C5A059]">03</span>
                    <MapPin className="w-5 h-5 text-[#8C8377]" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[#2A2724] mb-2">
                    Tell us where it goes
                  </h3>
                  <p className="text-xs sm:text-sm text-[#635A4F] leading-relaxed">
                    Enter the recipient&apos;s delivery details, such as their academic block, hostel, or a suitable meeting point.
                  </p>
                </div>
              </div>

              {/* Step 04 */}
              <div className="relative p-6 rounded-xl bg-[#FAF7F2] border border-[#E5DDD2] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-2xl font-bold text-[#C5A059]">04</span>
                    <Send className="w-5 h-5 text-[#8C8377]" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[#2A2724] mb-2">
                    We deliver
                  </h3>
                  <p className="text-xs sm:text-sm text-[#635A4F] leading-relaxed">
                    We prepare and deliver your letter. Hand-pressed, wax-sealed, and discreetly dropped.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION: LARGE EMOTIONAL CTA ================= */}
        <section className="py-24 bg-[#FAF7F2] border-t border-[#EAE2D7] relative overflow-hidden text-center">
          <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: `radial-gradient(#E8E0D5 0.8px, transparent 0.8px)`, backgroundSize: '24px 24px' }} />

          <div className="relative max-w-2xl mx-auto px-4 sm:px-6">
            <span className="text-xs font-serif uppercase tracking-widest text-[#C5A059] block mb-2">
              Send Love &amp; Appreciation
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#2A2724] tracking-tight mb-4">
              Your words. Their moment.
            </h2>
            <p className="font-serif text-base sm:text-lg text-[#61584D] max-w-lg mx-auto mb-8">
              A text notification disappears in minutes. A physical letter with dried botanicals and hot wax stays tucked in a desk drawer for years.
            </p>

            <Link
              href="/write"
              className="inline-flex items-center gap-2.5 bg-[#2A2724] hover:bg-[#3E3A35] text-[#FDFBF7] px-9 py-4 rounded-full font-serif text-base transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <Heart className="w-4 h-4 text-[#E5B8AE]" />
              <span>Start Writing</span>
              <ArrowRight className="w-4 h-4 text-[#DFC081]" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />
    </div>
  );
}
