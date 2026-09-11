import { BRAND } from '@/config/brand';

export interface PriceableDraft {
  letter: { writingStyle: 'classic' | 'calligraphy' };
  customization: { flowersEnabled: boolean; waxSealEnabled: boolean };
}

export function calculatePricing(draft: PriceableDraft) {
  const calligraphy = draft.letter.writingStyle === 'calligraphy' ? BRAND.pricing.calligraphy : 0;
  const flowers = draft.customization.flowersEnabled ? BRAND.pricing.flowers : 0;
  const waxSeal = draft.customization.waxSealEnabled ? BRAND.pricing.waxSeal : 0;

  return {
    baseLetter: BRAND.pricing.baseLetter,
    calligraphy,
    flowers,
    waxSeal,
    total: BRAND.pricing.baseLetter + calligraphy + flowers + waxSeal,
  };
}
