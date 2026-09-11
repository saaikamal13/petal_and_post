"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Check, ChevronLeft, CreditCard, Flower2, PenLine, Stamp } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { StepIndicator } from '@/components/layout/StepIndicator';
import { useLetter } from '@/context/LetterContext';

export default function BillingPage() {
  const router = useRouter();
  const { draft, pricing, recordOrder } = useLetter();
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [qrAvailable, setQrAvailable] = useState(true);

  const confirmOrder = () => {
    if (!paymentComplete) return;
    recordOrder();
    router.push('/confirmation');
  };

  return <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2A2724]"><Navbar /><StepIndicator />
    <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full">
      <header className="text-center max-w-2xl mx-auto mb-8 sm:mb-12"><span className="text-xs font-serif uppercase tracking-widest text-[#C5A059]">Step 04 - Billing</span><h1 className="font-serif text-3xl sm:text-4xl mt-1">Almost there.</h1><p className="font-serif text-sm sm:text-base text-[#6E655A] mt-2">Your letter is ready. Complete the payment below and we&apos;ll take care of the rest.</p></header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <section className="bg-white/80 border border-[#E5DDD2] rounded-xl p-6 sm:p-8 shadow-xs space-y-6"><div className="border-b border-[#EAE2D7] pb-3"><span className="text-xs font-serif uppercase tracking-widest text-[#C5A059]">UPI payment</span><h2 className="font-serif text-2xl">A small final step</h2></div>
          <div className="rounded-xl bg-[#FAF7F2] border border-[#E6D4AA] p-6 flex flex-col items-center text-center">
            {qrAvailable ? <Image src="/payment/upi-qr.png" alt="UPI payment QR code" width={220} height={220} className="max-w-full rounded-lg" onError={() => setQrAvailable(false)} /> : <div className="w-[220px] h-[220px] max-w-full rounded-lg border border-dashed border-[#C5A059]/70 bg-[#FCF8EE] flex flex-col justify-center"><span className="font-serif tracking-[0.2em] text-[#9E7D3A]">UPI QR CODE</span><span className="font-serif text-sm text-[#7A7369] mt-3 px-6">Your payment QR will appear here.</span></div>}
            <p className="font-serif text-sm text-[#6E655A] mt-5">Scan the QR code using any UPI app.</p>
          </div>
          <button type="button" onClick={() => setPaymentComplete((complete) => !complete)} className={`w-full p-3 rounded-lg border text-sm font-serif flex items-center justify-center gap-2 transition-colors ${paymentComplete ? 'bg-[#F4F8F5] border-[#7A9A84] text-[#3D5242]' : 'bg-[#FAF7F2] border-[#D8CFC2] hover:border-[#C5A059]'}`}><span className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentComplete ? 'bg-[#7A9A84] text-white border-[#7A9A84]' : 'border-[#A89E90]'}`}>{paymentComplete && <Check className="w-3 h-3" />}</span>I&apos;ve completed the payment</button>
          <button type="button" disabled={!paymentComplete} onClick={confirmOrder} className="w-full py-3.5 rounded-full bg-[#2A2724] text-[#FDFBF7] font-serif shadow-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#3E3A35]">Confirm Order 💌</button>
        </section>
        <aside className="bg-[#FAF7F2] border border-[#E5DDD2] rounded-xl p-6 sm:p-8 shadow-xs space-y-4"><div className="border-b border-[#EAE2D7] pb-3"><span className="text-xs font-serif uppercase tracking-widest text-[#8C8377]">Order summary</span><h2 className="font-serif text-2xl">Made especially for them</h2></div>
          <div className="space-y-3 text-sm font-serif text-[#5C5449]"><div className="flex justify-between"><span className="flex gap-2"><CreditCard className="w-4 h-4 text-[#C5A059]" />Base Letter</span><span>₹49</span></div><div className="flex justify-between"><span className="flex gap-2"><PenLine className="w-4 h-4 text-[#C5A059]" />{draft.letter.writingStyle === 'calligraphy' ? 'Calligraphy' : 'Classic / Fountain Pen'}</span><span>+₹{pricing.calligraphy}</span></div>{pricing.flowers > 0 && <div className="flex justify-between"><span className="flex gap-2"><Flower2 className="w-4 h-4 text-[#C5A059]" />Flowers</span><span>+₹{pricing.flowers}</span></div>}{pricing.waxSeal > 0 && <div className="flex justify-between"><span className="flex gap-2"><Stamp className="w-4 h-4 text-[#C5A059]" />Golden Wax Seal</span><span>+₹{pricing.waxSeal}</span></div>}</div>
          <div className="pt-4 border-t border-[#EAE2D7] flex justify-between font-serif font-semibold text-lg"><span>TOTAL</span><span className="text-[#C5A059] text-2xl">₹{pricing.total}</span></div>
          <button type="button" onClick={() => router.push('/review')} className="inline-flex items-center gap-1 text-xs font-serif text-[#7A7369] hover:text-[#2A2724]"><ChevronLeft className="w-3.5 h-3.5" />Back to review</button>
        </aside>
      </div>
    </main><Footer />
  </div>;
}
