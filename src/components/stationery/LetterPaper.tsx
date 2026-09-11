"use client";

import React, { useRef, useEffect } from 'react';
import { useLetter } from '@/context/LetterContext';
import { Feather } from 'lucide-react';

interface LetterPaperProps {
  isEditable?: boolean;
  className?: string;
}

export function LetterPaper({
  isEditable = true,
  className = '',
}: LetterPaperProps) {
  const { draft, updateLetter } = useLetter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea to fit content naturally like real stationery
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, 280)}px`;
    }
  }, [draft.letter.content]);

  const charCount = draft.letter.content.length;
  const wordCount = draft.letter.content.trim() ? draft.letter.content.trim().split(/\s+/).length : 0;
  const readTimeMin = Math.max(1, Math.ceil(wordCount / 180));

  const isCalligraphy = draft.letter.writingStyle === 'calligraphy';
  const letterFontClass = isCalligraphy
    ? 'font-script text-[23px] leading-[36px] tracking-wide'
    : 'font-serif text-[18px] leading-[32px] tracking-normal';

  // Format today's date in classical stationery style
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  const closingOptions = [
    "With love & fond memories,",
    "Always,",
    "Warmly,",
    "With deepest gratitude,",
    "Yours truly,",
    "Proudly cheering for you,",
    "An admirer,",
  ];

  return (
    <div
      className={`relative w-full max-w-[660px] mx-auto bg-[#FAF7F2] text-[#2A2724] rounded-sm p-6 sm:p-10 md:p-12 transition-all duration-300 shadow-paper border border-[#EAE2D7] ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(234, 226, 215, 0.25) 1px, transparent 1px),
          radial-gradient(#E8E0D5 0.7px, #FAF7F2 0.7px)
        `,
        backgroundSize: '100% 100%, 24px 24px',
      }}
    >
      {/* Decorative Deckle Edge Inner Border */}
      <div className="absolute inset-2 sm:inset-3.5 border border-[#E2D8CA]/60 pointer-events-none rounded-[2px]" />

      {/* Top Header: Classical Stationery Date & Watermark */}
      <div className="flex items-center justify-between border-b border-[#EAE2D7]/80 pb-4 mb-6">
        <div className="flex items-center gap-2 text-xs tracking-widest uppercase font-serif text-[#8C8377]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
          <span>Post Pressed Stationery</span>
        </div>
        <div className="font-serif italic text-xs sm:text-sm text-[#7D7468]">
          {todayFormatted}
        </div>
      </div>

      {/* The greeting stays blank until the sender writes one. */}
      <div className="mb-5 flex items-baseline gap-2 flex-wrap">
        {isEditable ? (
          <input
            type="text"
            value={draft.letter.recipientGreetingName}
            onChange={(e) => updateLetter({ recipientGreetingName: e.target.value })}
            placeholder=""
            aria-label="Recipient Greeting Name"
            className={`bg-transparent border-b border-[#D8CFC2] focus:border-[#C5A059] focus:outline-none px-1 py-0.5 text-lg sm:text-xl font-medium text-[#2A2724] transition-colors placeholder:text-[#A89E90]/70 min-w-[140px] ${
              isCalligraphy ? 'font-script text-2xl' : 'font-serif'
            }`}
          />
        ) : (
          draft.letter.recipientGreetingName && <span className={`text-lg sm:text-xl font-medium text-[#2A2724] ${isCalligraphy ? 'font-script text-2xl' : 'font-serif'}`}>{draft.letter.recipientGreetingName}</span>
        )}
        {draft.letter.recipientGreetingName && <span className="font-serif text-lg sm:text-xl text-[#3D3833] select-none">,</span>}
      </div>

      {/* Letter Body Area */}
      <div className="relative mb-6">
        {isEditable ? (
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={draft.letter.content}
              onChange={(e) => updateLetter({ content: e.target.value })}
              placeholder="Spill your heart…"
              aria-label="Letter message"
              rows={8}
              className={`w-full bg-transparent resize-none border-none focus:outline-none focus:ring-0 text-[#2A2724] placeholder:text-[#B8AD9F] placeholder:italic placeholder:font-serif transition-colors selection:bg-[#EAD5D0] ${letterFontClass}`}
              style={{ minHeight: '260px' }}
            />
          </div>
        ) : (
          <p className={`whitespace-pre-wrap text-[#2A2724] ${letterFontClass}`}>
            {draft.letter.content}
          </p>
        )}
      </div>

      {/* Closing & Sign-off Area */}
      <div className="mt-8 pt-4 border-t border-[#EAE2D7]/60 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-wider font-serif text-[#8C8377]">
            Closing
          </label>
          {isEditable ? (
            <select
              value={draft.letter.closing}
              onChange={(e) => updateLetter({ closing: e.target.value })}
              aria-label="Letter Closing"
              className="bg-[#F6F1EA] border border-[#DDD3C4] text-[#3D3833] text-sm rounded px-3 py-1.5 font-serif focus:outline-none focus:border-[#C5A059] transition-colors cursor-pointer"
            >
              <option value="" aria-label="No closing" />
              {closingOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <div className="font-serif italic text-base text-[#3D3833]">
              {draft.letter.closing}
            </div>
          )}
        </div>

        {/* Sender Signature */}
        <div className="sm:text-right space-y-1">
          <div className="text-xs uppercase tracking-wider font-serif text-[#8C8377]">
            {draft.sender.anonymityMode === 'anonymous' ? '' : 'Signed as'}
          </div>
          <div
            className={`text-lg sm:text-xl text-[#3D3833] ${
              isCalligraphy ? 'font-script text-2xl' : 'font-serif italic'
            }`}
          >
            {draft.sender.anonymityMode === 'nickname'
              ? draft.sender.nickname
              : draft.sender.anonymityMode === 'realName'
              ? draft.sender.realName
              : ''}
          </div>
        </div>
      </div>

      {/* Bottom Counter & Info Footer */}
      <div className="mt-8 pt-3 border-t border-[#EAE2D7] flex items-center justify-between text-xs text-[#8C8377] font-sans">
        <div className="flex items-center gap-2">
          <Feather className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>
            {draft.letter.writingStyle === 'calligraphy' ? 'Handwritten Calligraphy' : 'Classic Pen Serif'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span>{charCount} characters</span>
          <span className="w-1 h-1 rounded-full bg-[#C8C0B2]" />
          <span>{wordCount} words</span>
          <span className="w-1 h-1 rounded-full bg-[#C8C0B2]" />
          <span>~{readTimeMin} min read</span>
        </div>
      </div>
    </div>
  );
}
