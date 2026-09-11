"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveTrackedOrder, TrackedOrder } from '@/data/trackingOrders';
import { calculatePricing } from '@/lib/pricing';

export interface LetterState {
  recipientGreetingName: string;
  content: string;
  writingStyle: 'classic' | 'calligraphy';
  closing: string;
  senderSignature: string;
}

export interface CustomizationState {
  flowersEnabled: boolean;
  flowerType: 'babys-breath' | 'rose' | 'daisy' | 'tulip' | 'mixed-bouquet';
  waxSealEnabled: boolean;
  envelopeColor: 'ivory' | 'blush' | 'powder-blue' | 'sage' | 'kraft';
}

export interface RecipientState {
  name: string;
  department: string;
  year: string;
  registrationNumber: string;
  hostel: string;
  roomNumber: string;
  phone: string;
  deliveryInstructions: string;
}

export interface SenderState {
  anonymityMode: 'anonymous' | 'nickname' | 'realName';
  nickname: string;
  realName: string;
}

export interface PricingBreakdown {
  baseLetter: number;
  calligraphy: number;
  flowers: number;
  waxSeal: number;
  total: number;
}

export interface LetterDraft {
  letter: LetterState;
  customization: CustomizationState;
  recipient: RecipientState;
  sender: SenderState;
}

interface LetterContextType {
  draft: LetterDraft;
  pricing: PricingBreakdown;
  updateLetter: (partial: Partial<LetterState>) => void;
  updateCustomization: (partial: Partial<CustomizationState>) => void;
  updateRecipient: (partial: Partial<RecipientState>) => void;
  updateSender: (partial: Partial<SenderState>) => void;
  resetDraft: () => void;
  recordOrder: () => string;
  lastOrderId: string | null;
  isHydrated: boolean;
}

const DEFAULT_DRAFT: LetterDraft = {
  letter: {
    recipientGreetingName: "",
    content: "",
    writingStyle: 'classic',
    closing: "",
    senderSignature: "",
  },
  customization: {
    flowersEnabled: true,
    flowerType: 'babys-breath',
    waxSealEnabled: false, // Default: OFF
    envelopeColor: 'blush',
  },
  recipient: {
    name: "",
    department: "",
    year: "",
    registrationNumber: "",
    hostel: "",
    roomNumber: "",
    phone: "",
    deliveryInstructions: "",
  },
  sender: {
    anonymityMode: 'anonymous',
    nickname: "",
    realName: "",
  },
};

const STORAGE_KEY = "petal_and_post_draft_v2";

const LetterContext = createContext<LetterContextType | undefined>(undefined);

export function LetterProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = useState<LetterDraft>(DEFAULT_DRAFT);
  const [lastOrderId, setLastOrderId] = useState<string | null>("#POST-8942-IN");
  const [isHydrated, setIsHydrated] = useState(false);

  // Load draft from local storage safely on client mount
  useEffect(() => {
    const hydrationTimer = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.letter && parsed.customization && parsed.recipient) {
            // Merge saved drafts with current defaults as the draft evolves.
            const savedSender = parsed.sender || DEFAULT_DRAFT.sender;
            setDraft({
              ...DEFAULT_DRAFT,
              ...parsed,
              customization: {
                ...DEFAULT_DRAFT.customization,
                ...parsed.customization,
              },
              recipient: {
                ...DEFAULT_DRAFT.recipient,
                ...parsed.recipient,
              },
              // Preserve the value from the prior custom-name option on existing drafts.
              sender: {
                ...DEFAULT_DRAFT.sender,
                ...savedSender,
                anonymityMode: savedSender.anonymityMode === 'custom' ? 'realName' : savedSender.anonymityMode === 'none' ? 'anonymous' : savedSender.anonymityMode,
                realName: savedSender.realName || savedSender.senderName || '',
              },
            });
          }
        }
        const savedOrderId = localStorage.getItem("petal_and_post_last_order_id");
        if (savedOrderId) {
          setLastOrderId(savedOrderId);
        }
      } catch (e) {
        console.warn("Could not retrieve saved draft from local storage:", e);
      } finally {
        setIsHydrated(true);
      }
    }, 0);
    return () => window.clearTimeout(hydrationTimer);
  }, []);

  // Save to local storage on changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch (e) {
      console.warn("Could not persist draft to local storage:", e);
    }
  }, [draft, isHydrated]);

  const updateLetter = (partial: Partial<LetterState>) => {
    setDraft(prev => ({
      ...prev,
      letter: { ...prev.letter, ...partial },
    }));
  };

  const updateCustomization = (partial: Partial<CustomizationState>) => {
    setDraft(prev => ({
      ...prev,
      customization: { ...prev.customization, ...partial },
    }));
  };

  const updateRecipient = (partial: Partial<RecipientState>) => {
    setDraft(prev => ({
      ...prev,
      recipient: { ...prev.recipient, ...partial },
    }));
  };

  const updateSender = (partial: Partial<SenderState>) => {
    setDraft(prev => ({
      ...prev,
      sender: { ...prev.sender, ...partial },
    }));
  };

  const resetDraft = () => {
    setDraft(DEFAULT_DRAFT);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const pricing: PricingBreakdown = calculatePricing(draft);

  const recordOrder = (): string => {
    // Generate an order ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `#POST-${randomNum}-IN`;
    setLastOrderId(orderId);

    try {
      localStorage.setItem("petal_and_post_last_order_id", orderId);
    } catch {
      // ignore
    }

    const now = new Date();
    const timeFormatted = now.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) + ' · ' + now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    const newTrackedOrder: TrackedOrder = {
      id: orderId,
      createdAt: timeFormatted,
      status: "words_received",
      recipient: { ...draft.recipient },
      letter: {
        writingStyle: draft.letter.writingStyle,
        closing: draft.letter.closing,
        signature: draft.sender.anonymityMode === 'nickname'
          ? draft.sender.nickname
          : draft.sender.anonymityMode === 'realName'
          ? draft.sender.realName
          : '',
        charCount: draft.letter.content.length,
      },
      customization: {
        envelopeColor: draft.customization.envelopeColor,
        flowersEnabled: draft.customization.flowersEnabled,
        flowerType: draft.customization.flowerType,
        waxSealEnabled: draft.customization.waxSealEnabled,
      },
      pricing: { total: pricing.total },
      timeline: [
        {
          key: "words_received",
          icon: "✉️",
          title: "Words Received",
          description: "Your letter has safely reached us.",
          status: "current",
          timestamp: timeFormatted,
        },
        {
          key: "being_brought_to_life",
          icon: "🖋️",
          title: "Being Brought to Life",
          description: "Our team is carefully preparing your handwritten letter.",
          status: "upcoming",
        },
        {
          key: "being_prepared",
          icon: "🌸",
          title: "Being Prepared for Its Journey",
          description: "Your letter is being folded, sealed and dressed with the details you chose.",
          status: "upcoming",
        },
        {
          key: "on_its_way",
          icon: "🕊️",
          title: "On Its Way",
          description: "Your letter has left us and is making its way to its recipient.",
          status: "upcoming",
        },
        {
          key: "delivered",
          icon: "💌",
          title: "Delivered",
          description: "Your letter has found its way to them.",
          status: "upcoming",
        },
      ],
    };

    saveTrackedOrder(newTrackedOrder);
    return orderId;
  };

  return (
    <LetterContext.Provider
      value={{
        draft,
        pricing,
        updateLetter,
        updateCustomization,
        updateRecipient,
        updateSender,
        resetDraft,
        recordOrder,
        lastOrderId,
        isHydrated,
      }}
    >
      {children}
    </LetterContext.Provider>
  );
}

export function useLetter() {
  const context = useContext(LetterContext);
  if (!context) {
    throw new Error("useLetter must be used within a LetterProvider");
  }
  return context;
}
