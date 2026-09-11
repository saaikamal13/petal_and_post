"use client";

import React from 'react';
import { useLetter } from '@/context/LetterContext';
import { BRAND, WritingStyleOption } from '@/config/brand';
import { Check, Feather } from 'lucide-react';

export function WritingStyleSelector() {
  const { draft, updateLetter } = useLetter();
  const { writingStyle } = draft.letter;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-serif font-medium text-[#2A2724] block">
            Writing Style
          </label>
          <p className="text-xs text-[#7A7369]">
            The ink typography rendered on your physical stationery.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {BRAND.writingStyles.map((style: WritingStyleOption) => {
          const isSelected = writingStyle === style.id;
          const isCalligraphy = style.id === 'calligraphy';

          return (
            <button
              key={style.id}
              type="button"
              onClick={() => updateLetter({ writingStyle: style.id })}
              className={`relative flex flex-col p-3.5 rounded-lg border text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'border-[#C5A059] bg-[#FCF9F2] shadow-sm ring-1 ring-[#C5A059]'
                  : 'border-[#E5DDD2] bg-[#FAF7F2] hover:border-[#D0C5B5] hover:bg-[#F6F1EA]'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Feather className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span className="text-xs font-serif font-semibold text-[#2A2724]">
                    {style.name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs font-serif font-medium px-2 py-0.5 rounded-full ${
                    isCalligraphy
                      ? 'text-[#9E7D3A] bg-[#FAF3E1] border border-[#DFC081]/60'
                      : 'text-[#7A7369] bg-[#EFE9DE]'
                  }`}>
                    {style.price > 0 ? `+₹${style.price}` : '+₹0'}
                  </span>
                  {isSelected && (
                    <span className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#C5A059] text-white">
                      <Check className="w-2 h-2" />
                    </span>
                  )}
                </div>
              </div>

              <div
                className={`text-sm text-[#3E3A35] my-1 p-2 rounded bg-white/60 border border-[#EBE3D7] ${
                  isCalligraphy
                    ? 'font-script text-lg leading-tight'
                    : 'font-serif text-sm italic'
                }`}
              >
                {style.sampleText}
              </div>

              <p className="text-[11px] text-[#7A7369] mt-1">
                {style.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
