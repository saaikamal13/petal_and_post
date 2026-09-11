"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PenLine, MapPin, CheckCircle2, CreditCard } from 'lucide-react';

const STEPS = [
  { id: 'write',     label: 'Write & Style',     path: '/write',     icon: PenLine },
  { id: 'recipient', label: 'Delivery Details',   path: '/recipient', icon: MapPin },
  { id: 'review',    label: 'Review',             path: '/review',    icon: CheckCircle2 },
  { id: 'billing',   label: 'Billing',            path: '/billing',   icon: CreditCard },
];

export function StepIndicator() {
  const pathname = usePathname();
  const currentIndex = STEPS.findIndex((s) => s.path === pathname);
  if (currentIndex === -1) return null;

  return (
    <nav
      aria-label="Order progress"
      className="w-full py-3 border-b border-[#EAE2D7] bg-[#FAF7F2]/90 backdrop-blur-sm"
    >
      <div className="max-w-4xl mx-auto px-5 flex items-center justify-center gap-0">
        {STEPS.map((step, idx) => {
          const isCurrent = idx === currentIndex;
          const isPassed  = idx < currentIndex;
          const isFuture  = idx > currentIndex;

          const labelEl = (
            <div className="flex flex-col items-center gap-1 group">
              {/* Step number / check */}
              <div
                className={`flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-sans font-semibold transition-colors ${
                  isCurrent
                    ? 'bg-[#2A2724] text-[#F0EBE0]'
                    : isPassed
                    ? 'bg-[#7A9A84] text-white'
                    : 'bg-[#E8E1D8] text-[#9A9085]'
                }`}
              >
                {isPassed ? '✓' : `${idx + 1}`}
              </div>

              {/* Label */}
              <span
                className={`text-[10px] sm:text-[11px] font-sans tracking-wide transition-colors hidden xs:block ${
                  isCurrent ? 'text-[#2A2724] font-medium' : isPassed ? 'text-[#6B6358]' : 'text-[#A89E90]'
                }`}
              >
                {step.label}
              </span>

              {/* Active underline accent */}
              {isCurrent && (
                <div className="h-[2px] w-full bg-[#C5A059] rounded-full" aria-hidden="true" />
              )}
            </div>
          );

          return (
            <React.Fragment key={step.id}>
              {isPassed ? (
                <Link href={step.path} className="hover:opacity-80 transition-opacity px-3 sm:px-5">
                  {labelEl}
                </Link>
              ) : (
                <div className="px-3 sm:px-5">{labelEl}</div>
              )}

              {/* Connecting line between steps */}
              {idx < STEPS.length - 1 && (
                <div className="flex-1 max-w-[40px] sm:max-w-[60px]" aria-hidden="true">
                  <div
                    className={`h-px w-full transition-colors ${
                      idx < currentIndex ? 'bg-[#7A9A84]' : 'bg-[#DDD5C8]'
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}
