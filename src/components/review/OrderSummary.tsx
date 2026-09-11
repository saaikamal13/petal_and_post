"use client";

import React from 'react';
import { useLetter } from '@/context/LetterContext';
import { BRAND } from '@/config/brand';
import {
  Check,
  Feather,
  Lock,
  ShieldCheck,
  Eye,
} from 'lucide-react';
import Link from 'next/link';

interface OrderSummaryProps {
  onOpenLetterModal?: () => void;
}

export function OrderSummary({ onOpenLetterModal }: OrderSummaryProps) {
  const { draft, pricing } = useLetter();

  const activeColor = BRAND.envelopeColors.find(
    (c) => c.id === draft.customization.envelopeColor
  );

  const activeFlower = BRAND.flowers.find(
    (f) => f.id === draft.customization.flowerType
  );

  const activeWritingStyle = BRAND.writingStyles.find(
    (w) => w.id === draft.letter.writingStyle
  );

  const letterSnippet = draft.letter.content.slice(0, 100).trim();

  return (
    <div className="bg-white/85 rounded-xl border border-[#E5DDD2] shadow-sm p-6 sm:p-8 space-y-6">
      {/* Title */}
      <div className="border-b border-[#EAE2D7] pb-3">
        <span className="text-xs font-serif uppercase tracking-widest text-[#C5A059] block mb-1">
          Final Verification
        </span>
        <h3 className="font-serif text-2xl text-[#2A2724]">
          Order Summary
        </h3>
      </div>

      {/* 1. Letter Summary */}
      <div className="p-4 rounded-lg bg-[#FAF7F2] border border-[#EFE8DC] space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-serif font-semibold text-[#2A2724]">
            <Feather className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>The Letter</span>
          </div>
          <Link
            href="/write"
            className="text-[11px] font-serif text-[#C5A059] hover:underline"
          >
            Edit
          </Link>
        </div>

        <div className="text-xs text-[#5C5449] font-serif flex items-center gap-2">
          <span>Writing Style:</span>
          <span className="font-medium text-[#2A2724]">{activeWritingStyle?.name}</span>
          <span className="text-[#8C8377]">({draft.letter.content.length} characters)</span>
        </div>

        {letterSnippet && (
          <div className="text-[11px] italic font-serif text-[#786E63] line-clamp-2 bg-white/70 p-2 rounded border border-[#EBE3D7]">
            &ldquo;{letterSnippet}...&rdquo;
          </div>
        )}

        {onOpenLetterModal && (
          <button
            type="button"
            onClick={onOpenLetterModal}
            className="inline-flex items-center gap-1 text-[11px] text-[#6B6358] hover:text-[#2A2724] hover:underline cursor-pointer pt-1"
          >
            <Eye className="w-3 h-3 text-[#C5A059]" />
            <span>Read complete letter</span>
          </button>
        )}
      </div>

      {/* 2. Customization Details (With Checkmarks) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-serif uppercase tracking-wider text-[#8C8377]">
            Customization Details
          </h4>
          <Link href="/write" className="text-[11px] font-serif text-[#C5A059] hover:underline">
            Edit
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-2 text-xs font-serif">
          {/* Envelope */}
          <div className="flex items-center justify-between p-2.5 rounded bg-[#FAF7F2] border border-[#EFE8DC]">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full flex items-center justify-center bg-[#7A9A84] text-white">
                <Check className="w-2.5 h-2.5" />
              </span>
              <span className="text-[#3E3A35]">Envelope Paper</span>
            </div>
            <span className="font-medium text-[#2A2724]">{activeColor?.name}</span>
          </div>

          {/* Flowers */}
          <div className="flex items-center justify-between p-2.5 rounded bg-[#FAF7F2] border border-[#EFE8DC]">
            <div className="flex items-center gap-2">
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  draft.customization.flowersEnabled ? 'bg-[#7A9A84] text-white' : 'bg-[#E0D8CD] text-white'
                }`}
              >
                <Check className="w-2.5 h-2.5" />
              </span>
              <span className="text-[#3E3A35]">Dried Botanicals</span>
            </div>
            <span className="font-medium text-[#2A2724]">
              {draft.customization.flowersEnabled ? activeFlower?.name : 'None'}
            </span>
          </div>

          {/* Wax Seal */}
          <div className="flex items-center justify-between p-2.5 rounded bg-[#FAF7F2] border border-[#EFE8DC]">
            <div className="flex items-center gap-2">
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  draft.customization.waxSealEnabled ? 'bg-[#7A9A84] text-white' : 'bg-[#E0D8CD] text-white'
                }`}
              >
                <Check className="w-2.5 h-2.5" />
              </span>
              <span className="text-[#3E3A35]">Golden Wax Seal</span>
            </div>
            <span className="font-medium text-[#2A2724]">
              {draft.customization.waxSealEnabled ? 'Included' : 'Not selected'}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Recipient & Privacy Summary */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-serif uppercase tracking-wider text-[#8C8377]">
            Recipient &amp; Campus Drop
          </h4>
          <Link href="/recipient" className="text-[11px] font-serif text-[#C5A059] hover:underline">
            Edit
          </Link>
        </div>

        <div className="p-3.5 rounded-lg bg-[#FAF7F2] border border-[#EFE8DC] space-y-2 text-xs font-serif">
          <div className="flex items-center justify-between">
            <span className="text-[#5C5449]">To:</span>
            <span className="font-medium text-[#2A2724]">{draft.recipient.name || 'Recipient'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#5C5449]">Department:</span>
            <span className="font-medium text-[#2A2724] text-right">{draft.recipient.department || 'Not provided'}</span>
          </div>
          {draft.recipient.hostel && (
            <div className="flex items-center justify-between">
              <span className="text-[#5C5449]">Residence:</span>
              <span className="font-medium text-[#2A2724]">
                {draft.recipient.hostel} {draft.recipient.roomNumber && `(${draft.recipient.roomNumber})`}
              </span>
            </div>
          )}
          <div className="pt-2 border-t border-[#EAE2D7] flex items-center justify-between">
            <span className="text-[#5C5449]">Sender Anonymity:</span>
            <span className="inline-flex items-center gap-1 font-medium text-[#7A9A84]">
              <Lock className="w-3 h-3" />
              {draft.sender.anonymityMode === 'anonymous'
                ? '100% Anonymous'
                : draft.sender.anonymityMode === 'nickname'
                ? draft.sender.nickname
                : draft.sender.realName}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Pricing Breakdown */}
      <div className="pt-2 space-y-2 border-t border-[#EAE2D7]">
        <h4 className="text-xs font-serif uppercase tracking-wider text-[#8C8377] mb-2">
          Pricing Breakdown
        </h4>

        <div className="space-y-1.5 text-xs font-serif">
          <div className="flex items-center justify-between text-[#5C5449]">
            <span>Base Letter (120gsm laid paper + envelope)</span>
            <span>₹{pricing.baseLetter}</span>
          </div>

          <div className="flex items-center justify-between text-[#5C5449]">
            <span>{draft.letter.writingStyle === 'calligraphy' ? 'Calligraphy' : 'Classic / Fountain Pen'}</span>
            <span>+₹{pricing.calligraphy}</span>
          </div>

          {pricing.flowers > 0 && (
            <div className="flex items-center justify-between text-[#5C5449]">
              <span>Real Dried Botanicals ({activeFlower?.name})</span>
              <span>+₹{pricing.flowers}</span>
            </div>
          )}

          {pricing.waxSeal > 0 && (
            <div className="flex items-center justify-between text-[#5C5449]">
              <span>Hand-stamped Golden Wax Seal</span>
              <span>+₹{pricing.waxSeal}</span>
            </div>
          )}

          {/* Total */}
          <div className="pt-3 border-t border-[#EAE2D7] flex items-center justify-between text-base font-serif font-semibold text-[#2A2724]">
            <span>Total</span>
            <span className="text-xl text-[#C5A059]">₹{pricing.total}</span>
          </div>
        </div>
      </div>

      {/* Trust & Guarantee Pill */}
      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#F4F8F5] border border-[#D3DFD5] text-[11px] text-[#3D5242]">
        <ShieldCheck className="w-4 h-4 text-[#7A9A84] shrink-0" />
        <span>Discreet campus packaging · Sealed wax tamper-evident drop</span>
      </div>

      {/* Large CTA Button */}
      <Link
        href="/billing"
        className="w-full py-3.5 px-6 rounded-full bg-[#2A2724] hover:bg-[#3E3A35] text-[#FDFBF7] font-serif text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-75"
      >
        <span>Continue to Billing</span>
        <span className="text-lg">💌</span>
      </Link>
    </div>
  );
}
