"use client";

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StepIndicator } from '@/components/layout/StepIndicator';
import { RecipientForm } from '@/components/recipient/RecipientForm';
import { EnvelopePreview } from '@/components/stationery/EnvelopePreview';

export default function RecipientPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2A2724]">
      <Navbar />
      <StepIndicator />

      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-serif uppercase tracking-widest text-[#C5A059] block mb-1">
            Step 02 — Delivery Destination
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#2A2724]">
            Where should we send it?
          </h1>
          <p className="font-serif text-sm sm:text-base text-[#6E655A] mt-2">
            Just a few details to help us make sure your letter finds the right person.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form */}
          <div className="lg:col-span-7">
            <RecipientForm />
          </div>

          {/* Right: Live Address Preview on Envelope */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF7F2] border border-[#E5DDD2] rounded-xl p-5 sm:p-6 shadow-xs sticky top-24">
              <div className="flex items-center justify-between border-b border-[#EAE2D7] pb-2.5 mb-4">
                <span className="text-xs font-serif uppercase tracking-widest text-[#8C8377]">
                  Envelope Addressing Preview
                </span>
                <span className="text-[11px] font-serif text-[#C5A059] italic">
                  Face View
                </span>
              </div>

              <EnvelopePreview defaultSide="front" showToggle={true} />

              <div className="mt-4 pt-3 border-t border-[#EAE2D7] text-xs font-serif text-[#7A7369] leading-relaxed">
                Your live envelope updates as you add their details. We use these notes only to make a careful campus delivery.
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
