"use client";

import React from 'react';
import { useLetter } from '@/context/LetterContext';
import { BRAND, EnvelopeColorOption } from '@/config/brand';
import { Check } from 'lucide-react';

export function EnvelopeSelector() {
  const { draft, updateCustomization } = useLetter();
  const { envelopeColor } = draft.customization;

  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm font-serif font-medium text-[#2A2724] block">
          Envelope Color
        </label>
        <p className="text-xs text-[#7A7369]">
          Heavyweight 150gsm fine European deckle-finish envelopes.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1">
        {BRAND.envelopeColors.map((color: EnvelopeColorOption) => {
          const isSelected = envelopeColor === color.id;
          return (
            <button
              key={color.id}
              type="button"
              onClick={() => updateCustomization({ envelopeColor: color.id })}
              className={`relative flex flex-col items-center p-2.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'border-[#2A2724] bg-white shadow-sm ring-1 ring-[#2A2724]'
                  : 'border-[#E5DDD2] bg-[#FAF7F2] hover:border-[#D0C5B5]'
              }`}
            >
              {isSelected && (
                <span className="absolute top-1.5 right-1.5 flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#2A2724] text-white">
                  <Check className="w-2 h-2" />
                </span>
              )}

              {/* Envelope Swatch Circle with mini triangular flap detail */}
              <div
                className="w-8 h-8 rounded-full border border-black/10 shadow-xs my-1 relative overflow-hidden"
                style={{ backgroundColor: color.hex }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent" />
              </div>

              <div className="text-[11px] font-serif font-medium text-[#2A2724] mt-1 text-center">
                {color.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
