"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, GraduationCap, Home, Info, Lock, Phone, User } from 'lucide-react';
import { BRAND } from '@/config/brand';
import { useLetter } from '@/context/LetterContext';

export function RecipientForm() {
  const router = useRouter();
  const { draft, updateRecipient, updateSender } = useLetter();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!draft.recipient.name.trim()) nextErrors.name = "Please enter the recipient's name";
    if (!draft.recipient.department.trim()) nextErrors.department = 'Please specify their department or stream';
    if (!draft.recipient.year.trim()) nextErrors.year = 'Please select their year';
    if (draft.sender.anonymityMode === 'nickname' && !draft.sender.nickname.trim()) nextErrors.nickname = 'Please enter a nickname';
    if (draft.sender.anonymityMode === 'realName' && !draft.sender.realName.trim()) nextErrors.realName = 'Please enter the name to reveal';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const fieldClass = 'w-full px-3.5 py-2.5 rounded-lg border border-[#D8CFC2] bg-[#FAF7F2] text-sm text-[#2A2724] placeholder:text-[#A89E90] focus:bg-white focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all';

  return (
    <form onSubmit={(event) => { event.preventDefault(); if (validate()) router.push('/review'); }} className="space-y-8">
      <div className="p-4 sm:p-5 rounded-xl bg-[#F6F1EA] border border-[#E3D9CC] flex items-start gap-3.5">
        <Info className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm text-[#574F44] leading-relaxed">A few thoughtful details help our small team find the right person discreetly, wherever they spend their days on campus.</p>
      </div>

      <section className="bg-white/80 p-6 sm:p-8 rounded-xl border border-[#E5DDD2] shadow-xs space-y-6">
        <div className="border-b border-[#EAE2D7] pb-3">
          <span className="text-xs font-serif uppercase tracking-widest text-[#C5A059] block mb-1">Required Details</span>
          <h3 className="font-serif text-xl text-[#2A2724]">Who should receive it?</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <label className="space-y-1.5"><span className="block text-xs font-serif font-medium">Recipient Name <b className="text-[#C78275]">*</b></span><div className="relative"><input value={draft.recipient.name} onChange={(e) => { updateRecipient({ name: e.target.value }); setErrors((current) => ({ ...current, name: '' })); }} placeholder="Enter their name" className={fieldClass} /><User className="w-4 h-4 text-[#A89E90] absolute right-3 top-3" /></div>{errors.name && <p className="text-[11px] text-[#C78275]">{errors.name}</p>}</label>
          <label className="space-y-1.5"><span className="block text-xs font-serif font-medium">Department / Stream <b className="text-[#C78275]">*</b></span><div className="relative"><input list="dept-options" value={draft.recipient.department} onChange={(e) => { updateRecipient({ department: e.target.value }); setErrors((current) => ({ ...current, department: '' })); }} placeholder="Enter their department" className={fieldClass} /><GraduationCap className="w-4 h-4 text-[#A89E90] absolute right-3 top-3" /></div><datalist id="dept-options">{BRAND.departments.map((department) => <option key={department} value={department} />)}</datalist>{errors.department && <p className="text-[11px] text-[#C78275]">{errors.department}</p>}</label>
          <label className="space-y-1.5"><span className="block text-xs font-serif font-medium">Year <b className="text-[#C78275]">*</b></span><select value={draft.recipient.year} onChange={(e) => { updateRecipient({ year: e.target.value }); setErrors((current) => ({ ...current, year: '' })); }} className={fieldClass}><option value="">Select year</option>{BRAND.years.map((year) => <option key={year} value={year}>{year}</option>)}</select>{errors.year && <p className="text-[11px] text-[#C78275]">{errors.year}</p>}</label>
        </div>
      </section>

      <section className="bg-white/80 p-6 sm:p-8 rounded-xl border border-[#E5DDD2] shadow-xs space-y-6">
        <div className="border-b border-[#EAE2D7] pb-3"><span className="text-xs font-serif uppercase tracking-widest text-[#8C8377] block mb-1">Optional Details</span><h3 className="font-serif text-xl text-[#2A2724]">A little help finding them</h3></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <label className="space-y-1.5"><span className="block text-xs font-serif font-medium">Registration / Roll Number</span><input value={draft.recipient.registrationNumber} onChange={(e) => updateRecipient({ registrationNumber: e.target.value })} placeholder="Optional" className={fieldClass} /><span className="block text-[11px] text-[#7A7369]">Optional - this can help us identify the recipient on campus.</span></label>
          <label className="space-y-1.5"><span className="block text-xs font-serif font-medium">Hostel / Campus Location</span><div className="relative"><input value={draft.recipient.hostel} onChange={(e) => updateRecipient({ hostel: e.target.value })} placeholder="Optional" className={fieldClass} /><Home className="w-4 h-4 text-[#A89E90] absolute right-3 top-3" /></div></label>
          <label className="space-y-1.5"><span className="block text-xs font-serif font-medium">Room Number</span><input value={draft.recipient.roomNumber} onChange={(e) => updateRecipient({ roomNumber: e.target.value })} placeholder="Optional" className={fieldClass} /></label>
          <label className="space-y-1.5"><span className="block text-xs font-serif font-medium">Phone Number</span><div className="relative"><input type="tel" value={draft.recipient.phone} onChange={(e) => updateRecipient({ phone: e.target.value })} placeholder="Optional" className={fieldClass} /><Phone className="w-4 h-4 text-[#A89E90] absolute right-3 top-3" /></div></label>
          <label className="space-y-1.5 sm:col-span-2"><span className="block text-xs font-serif font-medium">Delivery Instructions</span><textarea value={draft.recipient.deliveryInstructions} onChange={(e) => updateRecipient({ deliveryInstructions: e.target.value })} placeholder="Anything that might help us find them?" rows={2} className={`${fieldClass} resize-none`} /><span className="block text-[11px] text-[#7A7369]">Anything that might help us find them?</span></label>
        </div>
      </section>

      <section className="bg-[#FAF7F2] p-6 sm:p-8 rounded-xl border-2 border-[#C5A059]/40 shadow-xs space-y-5">
        <div className="flex items-start gap-3"><span className="w-9 h-9 rounded-full bg-[#FCF8EE] border border-[#E6D4AA] flex items-center justify-center text-[#C5A059] shrink-0"><Lock className="w-4 h-4" /></span><div><h3 className="font-serif text-xl">Keep Me Anonymous</h3><p className="text-xs sm:text-sm text-[#635A4F] mt-1">Your identity stays with us and is never printed on the letter unless you choose to reveal it.</p></div></div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[['anonymous', 'Anonymous', 'Your identity will not be displayed on the letter.'], ['nickname', 'Use a nickname', 'Sign the letter with a nickname of your choice.'], ['realName', 'Reveal my name', 'Add your name or a chosen signature to the letter.']].map(([mode, title, description]) => <label key={mode} className={`p-4 rounded-lg border cursor-pointer ${draft.sender.anonymityMode === mode ? 'border-[#C5A059] bg-[#FCF9F2] ring-1 ring-[#C5A059]' : 'border-[#E5DDD2] bg-white'}`}><span className="flex justify-between text-xs font-serif font-medium"><span>{title}</span><input type="radio" name="sender-identity" checked={draft.sender.anonymityMode === mode} onChange={() => updateSender({ anonymityMode: mode as 'anonymous' | 'nickname' | 'realName' })} /></span><span className="block text-[11px] text-[#7A7369] mt-2">{description}</span></label>)}
        </div>
        {draft.sender.anonymityMode === 'nickname' && <label className="block space-y-1.5"><span className="text-xs font-serif font-medium">Nickname to reveal</span><input value={draft.sender.nickname} onChange={(e) => { updateSender({ nickname: e.target.value }); setErrors((current) => ({ ...current, nickname: '' })); }} placeholder="Enter a nickname" className={fieldClass} />{errors.nickname && <p className="text-[11px] text-[#C78275]">{errors.nickname}</p>}</label>}
        {draft.sender.anonymityMode === 'realName' && <label className="block space-y-1.5"><span className="text-xs font-serif font-medium">Name or signature to reveal</span><input value={draft.sender.realName} onChange={(e) => { updateSender({ realName: e.target.value }); setErrors((current) => ({ ...current, realName: '' })); }} placeholder="Enter the name to print" className={fieldClass} />{errors.realName && <p className="text-[11px] text-[#C78275]">{errors.realName}</p>}</label>}
      </section>

      <div className="flex items-center justify-between pt-6 border-t border-[#EAE2D7]"><Link href="/write" className="inline-flex items-center gap-2 font-serif text-sm text-[#665E54] px-4 py-2.5"><ArrowLeft className="w-4 h-4" />Back to Letter</Link><button type="submit" className="inline-flex items-center gap-2 bg-[#2A2724] hover:bg-[#3E3A35] text-[#FDFBF7] px-7 py-3 rounded-full font-serif text-sm shadow-sm"><span>Continue to Review</span><ArrowRight className="w-4 h-4 text-[#DFC081]" /></button></div>
    </form>
  );
}
