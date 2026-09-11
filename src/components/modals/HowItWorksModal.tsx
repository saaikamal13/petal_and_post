"use client";

import React from 'react';
import { BRAND } from '@/config/brand';
import { X, PenLine, Sparkles, MapPin, Send, ShieldCheck, Heart } from 'lucide-react';
import Link from 'next/link';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HowItWorksModal({ isOpen, onClose }: HowItWorksModalProps) {
  if (!isOpen) return null;

  const steps = [
    {
      num: "01",
      title: "Write Online",
      desc: "Type freely in our peaceful stationery editor. Pour your heart out, whether it's an apology, a memory, or quiet admiration.",
      icon: PenLine,
    },
    {
      num: "02",
      title: "Make It Yours",
      desc: "Choose between Classic Pen and Calligraphy, pick from 5 fine envelope tones, add dried floral stems, and stamp an antique golden wax seal.",
      icon: Sparkles,
    },
    {
      num: "03",
      title: "Tell Us Where It Goes",
      desc: "Enter recipient campus details. Choose whether to reveal your name or stay 100% anonymous — your identity is never shared.",
      icon: MapPin,
    },
    {
      num: "04",
      title: "We Deliver",
      desc: "We print your letter on 120gsm laid paper, fold it by hand, affix real dried botanicals, stamp the hot wax seal, and deliver it discreetly within VIT Chennai.",
      icon: Send,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] border border-[#E0D6C8] rounded-xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close How It Works Modal"
          className="absolute top-4 right-4 p-2 text-[#7D7468] hover:text-[#2A2724] rounded-full hover:bg-[#EAE2D5] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-serif uppercase tracking-widest text-[#C5A059] block mb-1">
            The Journey of a Letter
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#2A2724]">
            How {BRAND.name} Works
          </h3>
          <p className="text-sm text-[#736B60] max-w-md mx-auto mt-2">
            Turning intangible digital thoughts into physical keepsakes that arrive right at their dorm door.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className="p-4 rounded-lg bg-white/70 border border-[#E5DDD2] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-serif font-semibold text-[#C5A059] bg-[#FCF8EE] px-2 py-0.5 rounded border border-[#E6D4AA]">
                      {s.num}
                    </span>
                    <Icon className="w-4 h-4 text-[#8C8377]" />
                  </div>
                  <h4 className="font-serif font-medium text-base text-[#2A2724] mb-1">
                    {s.title}
                  </h4>
                  <p className="text-xs text-[#6B6358] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Privacy Note */}
        <div className="p-4 rounded-lg bg-[#F4F8F5] border border-[#D3DFD5] flex items-start gap-3 mb-6">
          <ShieldCheck className="w-5 h-5 text-[#6B8E76] shrink-0 mt-0.5" />
          <div className="text-xs text-[#405445] leading-relaxed">
            <span className="font-semibold text-[#2D3E31] block mb-0.5">
              100% Identity Protection Guarantee
            </span>
            Our delivery team only sees the location details needed to find the recipient. The letter interior is sealed in opaque packaging, and your personal sender email or account is never shared with the recipient unless you write it into the letter yourself.
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/write"
            onClick={onClose}
            className="inline-flex items-center gap-2 bg-[#2A2724] hover:bg-[#3E3A35] text-[#FDFBF7] px-6 py-2.5 rounded-full font-serif text-sm transition-all shadow-sm hover:shadow"
          >
            <Heart className="w-4 h-4 text-[#E5B8AE]" />
            <span>Start Writing Your Letter</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
