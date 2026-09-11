"use client";

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StepIndicator } from '@/components/layout/StepIndicator';
import { LetterEditor } from '@/components/editor/LetterEditor';

export default function WritePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2A2724]">
      <Navbar />
      <StepIndicator />

      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-serif uppercase tracking-widest text-[#C5A059] block mb-1">
            Step 01 — Letter Studio
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#2A2724]">
            Craft your physical letter
          </h1>
          <p className="font-serif text-sm sm:text-base text-[#6E655A] mt-2">
            Write from the heart. Choose your stationery typography, dried florals, and hand-stamped wax seal.
          </p>
        </div>

        {/* Studio Experience */}
        <LetterEditor />
      </main>

      <Footer />
    </div>
  );
}
