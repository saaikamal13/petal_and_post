"use client";

import React from 'react';
import { useLetter } from '@/context/LetterContext';
import { BRAND, FlowerOption } from '@/config/brand';
import { BotanicalArt } from '@/components/stationery/BotanicalArt';
import { Check } from 'lucide-react';

export function FlowerSelector() {
  const { draft, updateCustomization } = useLetter();
  const { flowersEnabled, flowerType } = draft.customization;

  return (
    <div className="space-y-4">
      {/* Toggle Header */}
      <div className="flex items-center justify-between">
        <div>
          <label htmlFor="toggle-flowers" className="text-sm font-serif font-medium text-[#2A2724] cursor-pointer block">
            Add flowers to the envelope
          </label>
          <p className="text-xs text-[#7A7369]">
            A genuine dried botanical stem lovingly tucked into your sealed envelope.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-serif text-[#C5A059] font-medium">+₹{BRAND.pricing.flowers}</span>
          <button
            type="button"
            role="switch"
            id="toggle-flowers"
            aria-checked={flowersEnabled}
            onClick={() => updateCustomization({ flowersEnabled: !flowersEnabled })}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] ${
              flowersEnabled ? 'bg-[#7A9A84]' : 'bg-[#DDD5CA]'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                flowersEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Selectable Flower Cards */}
      {flowersEnabled && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          {BRAND.flowers.map((flower: FlowerOption) => {
            const isSelected = flowerType === flower.id;
            return (
              <button
                key={flower.id}
                type="button"
                onClick={() => updateCustomization({ flowerType: flower.id })}
                className={`group relative flex flex-col items-center p-3 rounded-lg border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-[#7A9A84] bg-[#F4F8F5] shadow-sm ring-1 ring-[#7A9A84]'
                    : 'border-[#E5DDD2] bg-[#FAF7F2] hover:border-[#D0C5B5] hover:bg-[#F6F1EA]'
                }`}
              >
                {/* Selection indicator pill */}
                {isSelected && (
                  <span className="absolute top-2 right-2 flex items-center justify-center w-4 h-4 rounded-full bg-[#7A9A84] text-white">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                )}

                {/* Botanical Artwork Preview */}
                <div className="w-14 h-20 flex items-center justify-center my-1 transition-transform duration-200 group-hover:scale-105">
                  <BotanicalArt flowerType={flower.id} className="w-full h-full object-contain" />
                </div>

                <div className="w-full text-center mt-1">
                  <div className="text-xs font-serif font-medium text-[#2A2724]">
                    {flower.name}
                  </div>
                  <div className="text-[10px] italic text-[#80766A] line-clamp-1">
                    {flower.meaning}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
