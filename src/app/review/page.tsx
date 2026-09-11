"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StepIndicator } from '@/components/layout/StepIndicator';
import { EnvelopePreview } from '@/components/stationery/EnvelopePreview';
import { LetterPaper } from '@/components/stationery/LetterPaper';
import { OrderSummary } from '@/components/review/OrderSummary';
import { X, Eye } from 'lucide-react';

export default function ReviewPage() {
  const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2A2724]">
      <Navbar />
      <StepIndicator />

      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div>
            {/* Page Header */}
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
              <span className="text-xs font-serif uppercase tracking-widest text-[#C5A059] block mb-1">
                Step 03 — Order Review
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#2A2724]">
                Review your letter
              </h1>
              <p className="font-serif text-sm sm:text-base text-[#6E655A] mt-2">
                Double-check your words, physical stationery selections, and campus delivery details before sealing.
              </p>
            </div>

            {/* Split Screen Review */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* LEFT: VISUAL ENVELOPE PREVIEW */}
              <div className="lg:col-span-6 space-y-6">
                <div className="bg-[#FAF7F2] border border-[#E5DDD2] rounded-xl p-6 sm:p-8 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#EAE2D7] pb-3 mb-6">
                    <div>
                      <span className="text-xs font-serif uppercase tracking-widest text-[#8C8377] block">
                        Physical Package
                      </span>
                      <h3 className="font-serif text-lg text-[#2A2724]">
                        Sealed Envelope Preview
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsLetterModalOpen(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-serif text-[#C5A059] hover:text-[#9E7D3A] bg-[#FCF8EE] px-3 py-1.5 rounded-full border border-[#E6D4AA] transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Peek Letter</span>
                    </button>
                  </div>

                  <EnvelopePreview
                    showToggle={true}
                    defaultSide="back"
                    onPeekLetter={() => setIsLetterModalOpen(true)}
                  />

                  <div className="mt-6 pt-4 border-t border-[#EAE2D7] text-xs font-serif text-[#7E7569] leading-relaxed text-center">
                    Your letter is sealed inside this envelope with genuine botanicals and solid golden wax. It will not be opened until the recipient breaks the seal.
                  </div>
                </div>
              </div>

              {/* RIGHT: ORDER SUMMARY & CTAS */}
              <div className="lg:col-span-6">
                <OrderSummary onOpenLetterModal={() => setIsLetterModalOpen(true)} />
              </div>
            </div>
        </div>
      </main>

      <Footer />

      {/* Peek Letter Modal */}
      {isLetterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-[#FAF7F2] border border-[#E0D6C8] rounded-xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsLetterModalOpen(false)}
              aria-label="Close Letter Peek"
              className="absolute top-4 right-4 p-2 text-[#7D7468] hover:text-[#2A2724] rounded-full hover:bg-[#EAE2D5] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <span className="text-xs font-serif uppercase tracking-widest text-[#C5A059] block mb-1">
                Stationery Peek
              </span>
              <h3 className="font-serif text-2xl text-[#2A2724]">
                Letter Contents
              </h3>
            </div>

            <LetterPaper isEditable={false} />

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLetterModalOpen(false)}
                className="font-serif text-xs text-[#6B6358] hover:text-[#2A2724] bg-[#EAE2D5] hover:bg-[#DDD2C2] px-6 py-2 rounded-full transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
