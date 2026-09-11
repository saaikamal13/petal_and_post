"use client";

import React from 'react';
import { X, ChevronDown } from 'lucide-react';

interface CampusFaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CampusFaqModal({ isOpen, onClose }: CampusFaqModalProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  if (!isOpen) return null;

  const faqs = [
    {
      q: "How does delivery within VIT Chennai work?",
      a: "Our delivery team coordinates discreet hand-delivery across appropriate VIT Chennai locations, including classrooms, academic blocks, faculty areas, hostels, and agreed meeting points.",
    },
    {
      q: "Will the recipient know my identity?",
      a: "Only if you want them to! By default, sender details are 100% anonymous. We do not print your contact number, email, or name anywhere on the stationery or envelope unless you explicitly write it in your signature.",
    },
    {
      q: "What if I don't know their room number?",
      a: "Room numbers can be helpful for hostel deliveries, but a department, year, or suitable campus meeting point can also help our team find the recipient thoughtfully.",
    },
    {
      q: "Are the flowers real or printed?",
      a: "They are 100% genuine natural dried botanicals! We carefully dry and press real Baby's Breath, Rose Petals, Chamomile Daisies, and Eucalyptus sprigs. They retain their natural botanical beauty for years as a treasured keepsake.",
    },
    {
      q: "How long does physical delivery take?",
      a: "Once your order is received, we carefully prepare your letter by hand and deliver it within VIT Chennai. Delivery time may vary depending on the preparation required and the recipient's location on campus.",
    },
    {
      q: "Where can I send a letter?",
      a: "Petal & Post currently delivers exclusively within VIT Chennai. Letters can be delivered to students and faculty members across appropriate campus locations, including classrooms, academic blocks, hostels and other agreed meeting points.",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] border border-[#E0D6C8] rounded-xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close FAQ Modal"
          className="absolute top-4 right-4 p-2 text-[#7D7468] hover:text-[#2A2724] rounded-full hover:bg-[#EAE2D5] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <span className="text-xs font-serif uppercase tracking-widest text-[#C5A059] block mb-1">
            Answers &amp; Clarity
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#2A2724]">
            Frequently Asked Questions
          </h3>
          <p className="text-sm text-[#736B60] max-w-md mx-auto mt-2">
            Everything you need to know about delivery within VIT Chennai and privacy.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-[#E5DDD2] rounded-lg bg-white/70 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left px-4 py-3.5 flex items-center justify-between gap-4 font-serif text-sm sm:text-base text-[#2A2724] hover:bg-white transition-colors cursor-pointer"
                >
                  <span className="font-medium">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8C8377] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#C5A059]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[#625B51] font-sans leading-relaxed border-t border-[#F0EAE1]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
