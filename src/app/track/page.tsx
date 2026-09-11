"use client";

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { getTrackedOrder, TrackedOrder } from '@/data/trackingOrders';

function TrackContent() {
  const searchParams = useSearchParams();
  const requestedId = searchParams.get('orderId') || '';
  const [orderId, setOrderId] = useState(requestedId);
  const [order, setOrder] = useState<TrackedOrder | null>(() => requestedId ? getTrackedOrder(requestedId) : null);
  const [searched, setSearched] = useState(Boolean(requestedId));
  const track = (id = orderId) => { setSearched(true); setOrder(getTrackedOrder(id)); };
  return <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2A2724]"><Navbar /><main className="flex-1 max-w-3xl w-full mx-auto px-4 py-10 sm:py-14"><header className="text-center mb-9"><span className="text-xs font-serif uppercase tracking-widest text-[#C5A059]">Order tracking</span><h1 className="font-serif text-3xl sm:text-4xl mt-1">Where is your letter?</h1><p className="font-serif text-sm sm:text-base text-[#6E655A] mt-2">Enter your order ID and we&apos;ll show you where your letter is in its journey.</p></header><form onSubmit={(event) => { event.preventDefault(); track(); }} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"><input value={orderId} onChange={(event) => setOrderId(event.target.value)} placeholder="Order ID" className="flex-1 px-4 py-3 rounded-full border border-[#D8CFC2] bg-white font-serif focus:outline-none focus:ring-1 focus:ring-[#C5A059]" /><button className="inline-flex justify-center items-center gap-2 bg-[#2A2724] text-[#FDFBF7] rounded-full px-6 py-3 font-serif"><Search className="w-4 h-4" />Track Letter</button></form>{searched && !order && <p className="text-center font-serif text-sm text-[#7A7369] mt-8">We couldn&apos;t find that order ID. Please check it and try again.</p>}{order && <section className="mt-10 bg-white/80 border border-[#E5DDD2] rounded-xl p-6 sm:p-8 shadow-xs"><div className="pb-5 border-b border-[#EAE2D7]"><span className="text-xs uppercase tracking-widest font-serif text-[#8C8377]">{order.id}</span><h2 className="font-serif text-2xl mt-1">A note for {order.recipient.name || 'someone special'}</h2></div><ol className="mt-6 space-y-0">{order.timeline.map((stage, index) => <li key={stage.key} className="relative flex gap-4 pb-7 last:pb-0"><div className="flex flex-col items-center"><span className={`w-10 h-10 rounded-full flex items-center justify-center border ${stage.status === 'completed' ? 'bg-[#7A9A84] border-[#7A9A84]' : stage.status === 'current' ? 'bg-[#FCF8EE] border-[#C5A059] ring-2 ring-[#C5A059]/20' : 'bg-[#F2EDE4] border-[#E0D6C8] grayscale opacity-60'}`}>{stage.status === 'completed' ? '✓' : stage.icon}</span>{index < order.timeline.length - 1 && <span className={`w-px flex-1 mt-2 ${stage.status === 'completed' ? 'bg-[#7A9A84]' : 'bg-[#E0D8CD]'}`} />}</div><div className="pt-1 pb-2"><div className="flex flex-wrap items-baseline gap-x-3"><h3 className={`font-serif text-lg ${stage.status === 'upcoming' ? 'text-[#8C8377]' : 'text-[#2A2724]'}`}>{stage.title}</h3>{stage.timestamp && <span className="text-[11px] font-serif text-[#8C8377]">{stage.timestamp}</span>}</div><p className={`font-serif text-sm mt-1 ${stage.status === 'upcoming' ? 'text-[#9C9388]' : 'text-[#6E655A]'}`}>{stage.description}</p></div></li>)}</ol></section>}</main><Footer /></div>;
}

export default function TrackPage() {
  return <Suspense fallback={<div className="min-h-screen bg-[#FDFBF7]" />}><TrackContent /></Suspense>;
}
