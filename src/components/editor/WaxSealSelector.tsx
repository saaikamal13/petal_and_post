"use client";

import React from 'react';
import { useLetter } from '@/context/LetterContext';
import { BRAND } from '@/config/brand';

export function WaxSealSelector() {
  const { draft, updateCustomization } = useLetter();
  const { waxSealEnabled } = draft.customization;

  return (
    <div className="space-y-3">
      {/* Simple ON/OFF Toggle */}
      <div className="flex items-center justify-between p-3.5 rounded-lg border border-[#E5DDD2] bg-[#FAF7F2]">
        <div>
          <label htmlFor="toggle-wax-seal" className="text-sm font-serif font-medium text-[#2A2724] cursor-pointer block">
            {BRAND.waxSeal.name}
          </label>
          <p className="text-xs text-[#7A7369] mt-0.5">
            {BRAND.waxSeal.description}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-serif font-semibold text-[#C5A059]">
            +₹{BRAND.pricing.waxSeal}
          </span>
          <button
            type="button"
            role="switch"
            id="toggle-wax-seal"
            aria-checked={waxSealEnabled}
            onClick={() => updateCustomization({ waxSealEnabled: !waxSealEnabled })}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] ${
              waxSealEnabled ? 'bg-[#C5A059]' : 'bg-[#DDD5CA]'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                waxSealEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
