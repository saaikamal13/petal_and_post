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
  recordOrder: () => Promise<string>;
  lastOrderId: string | null;
  orderToken: string | null;
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
    waxSealEnabled: false,
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

interface SupabaseOrder {
  id: string;
  order_token: string;
  status: string;
  total_cents: number;
  payment_status: string;
}

interface SupabaseLetter {
  id: string;
  order_id: string;
  content: string;
  writing_style: string;
  closing: string;
  recipient_greeting: string;
  anonymity_mode: string;
  nickname: string | null;
  real_name: string | null;
}

interface SupabaseRecipient {
  id: string;
  order_id: string;
  recipient_type: string;
  name: string;
  department_or_school: string;
  year: string | null;
  registration_number: string | null;
  delivery_location: string;
  delivery_instructions: string | null;
}

interface SupabaseCustomization {
  id: string;
  order_id: string;
  flowers_enabled: boolean;
  flower_type: string | null;
  wax_seal_enabled: boolean;
  envelope_color: string;
  base_price_cents: number;
  calligraphy_price_cents: number;
  flowers_price_cents: number;
  wax_seal_price_cents: number;
}

interface SupabaseOrderTimeline {
  id: string;
  order_id: string;
  stage: string;
  created_at: string;
}

const STORAGE_KEY = "petal_and_post_draft_v2";

const LetterContext = createContext<LetterContextType | undefined>(undefined);

function apiFetch(path: string, init: RequestInit = {}) {
  const url = `/api${path}`;

  return fetch(url, {
    ...init,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
  }).then(async (res) => {
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || 'API request failed');
    }

    return res.json();
  });
}

export function LetterProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = useState<LetterDraft>(DEFAULT_DRAFT);
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);
  const [orderToken, setOrderToken] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load draft from local storage safely on client mount
  useEffect(() => {
    const hydrationTimer = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
          const parsed = JSON.parse(saved);

          if (
            parsed &&
            parsed.letter &&
            parsed.customization &&
            parsed.recipient
          ) {
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

              sender: {
                ...DEFAULT_DRAFT.sender,
                ...savedSender,
                anonymityMode:
                  savedSender.anonymityMode === 'custom'
                    ? 'realName'
                    : savedSender.anonymityMode === 'none'
                    ? 'anonymous'
                    : savedSender.anonymityMode,

                realName:
                  savedSender.realName ||
                  savedSender.senderName ||
                  '',
              },
            });
          }
        }

        const savedOrderId = localStorage.getItem(
          "petal_and_post_last_order_id"
        );

        if (savedOrderId) {
          setLastOrderId(savedOrderId);
        }
      } catch (e) {
        console.warn(
          "Could not retrieve saved draft from local storage:",
          e
        );
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
      console.warn(
        "Could not persist draft to local storage:",
        e
      );
    }
  }, [draft, isHydrated]);

  const updateLetter = (partial: Partial<LetterState>) => {
    setDraft(prev => ({
      ...prev,
      letter: {
        ...prev.letter,
        ...partial,
      },
    }));
  };

  const updateCustomization = (
    partial: Partial<CustomizationState>
  ) => {
    setDraft(prev => ({
      ...prev,
      customization: {
        ...prev.customization,
        ...partial,
      },
    }));
  };

  const updateRecipient = (
    partial: Partial<RecipientState>
  ) => {
    setDraft(prev => ({
      ...prev,
      recipient: {
        ...prev.recipient,
        ...partial,
      },
    }));
  };

  const updateSender = (
    partial: Partial<SenderState>
  ) => {
    setDraft(prev => ({
      ...prev,
      sender: {
        ...prev.sender,
        ...partial,
      },
    }));
  };

  const resetDraft = () => {
    setDraft(DEFAULT_DRAFT);

    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem("petal_and_post_last_order_id");
    } catch {
      // ignore
    }

    setOrderToken(null);
    setLastOrderId(null);
  };

  const pricing: PricingBreakdown = calculatePricing(draft);

  const recordOrder = async (): Promise<string> => {
    try {
      // Send order data to POST /api/orders.
      // The API route handles Supabase insertion with service-role key.
      const response = await apiFetch('/orders', {
        method: 'POST',

        body: JSON.stringify({
          content: draft.letter.content,
          writingStyle: draft.letter.writingStyle,
          closing: draft.letter.closing,
          recipientGreetingName:
            draft.letter.recipientGreetingName,

          anonymityMode: draft.sender.anonymityMode,

          sender: {
            anonymityMode: draft.sender.anonymityMode,

            nickname:
              draft.sender.anonymityMode === 'nickname'
                ? draft.sender.nickname
                : null,

            realName:
              draft.sender.anonymityMode === 'realName'
                ? draft.sender.realName
                : null,
          },

          flowersEnabled:
            draft.customization.flowersEnabled,

          flowerType:
            draft.customization.flowerType || null,

          waxSealEnabled:
            draft.customization.waxSealEnabled,

          envelopeColor:
            draft.customization.envelopeColor,

          recipientData: {
            name: draft.recipient.name,

            // Database currently expects a recipient type.
            // All current recipients are students.
            recipientType: 'student',

            department: draft.recipient.department,

            year: draft.recipient.year,

            registrationNumber:
              draft.recipient.registrationNumber,

            deliveryLocation:
              draft.recipient.deliveryInstructions,

            deliveryInstructions:
              draft.recipient.deliveryInstructions,
          },
        }),
      });

      const {
        success,
        orderToken: returnedToken,
        total,
        error,
      } = response;

      // IMPORTANT:
      // Never continue to confirmation without a real token
      // returned by the API.
      if (error || !success) {
        throw new Error(
          error || 'Failed to create order'
        );
      }

      if (
        !returnedToken ||
        typeof returnedToken !== 'string'
      ) {
        throw new Error(
          'Order was created but no order token was returned'
        );
      }

      // IMPORTANT:
      // Use the token returned by THIS API request.
      // Do NOT use the old React state value here.
      setOrderToken(returnedToken);
      setLastOrderId(returnedToken);

      // Save the REAL server-generated order token.
      try {
        localStorage.setItem(
          "petal_and_post_last_order_id",
          returnedToken
        );
      } catch {
        // ignore
      }

      // Also save to tracked orders localStorage
      // for backwards compatibility.
      const now = new Date();

      const timeFormatted =
        now.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
        }) +
        ' · ' +
        now.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
        });

      const newTrackedOrder: TrackedOrder = {
        id: returnedToken,

        createdAt: timeFormatted,

        status: "words_received",

        recipient: {
          ...draft.recipient,
        },

        letter: {
          writingStyle:
            draft.letter.writingStyle,

          closing:
            draft.letter.closing,

          signature:
            draft.sender.anonymityMode === 'nickname'
              ? draft.sender.nickname
              : draft.sender.anonymityMode === 'realName'
              ? draft.sender.realName
              : '',

          charCount:
            draft.letter.content.length,
        },

        customization: {
          envelopeColor:
            draft.customization.envelopeColor,

          flowersEnabled:
            draft.customization.flowersEnabled,

          flowerType:
            draft.customization.flowerType,

          waxSealEnabled:
            draft.customization.waxSealEnabled,
        },

        pricing: {
          total: pricing.total,
        },

        timeline: [
          {
            key: "words_received",
            icon: "✉️",
            title: "Words Received",
            description:
              "Your letter has safely reached us.",
            status: "current",
            timestamp: timeFormatted,
          },

          {
            key: "being_brought_to_life",
            icon: "🖋️",
            title: "Being Brought to Life",
            description:
              "Our team is carefully preparing your handwritten letter.",
            status: "upcoming",
          },

          {
            key: "being_prepared",
            icon: "🌸",
            title: "Being Prepared for Its Journey",
            description:
              "Your letter is being folded, sealed and dressed with the details you chose.",
            status: "upcoming",
          },

          {
            key: "on_its_way",
            icon: "🕊️",
            title: "On Its Way",
            description:
              "Your letter has left us and is making its way to its recipient.",
            status: "upcoming",
          },

          {
            key: "delivered",
            icon: "💌",
            title: "Delivered",
            description:
              "Your letter has found its way to them.",
            status: "upcoming",
          },
        ],
      };

      saveTrackedOrder(newTrackedOrder);

      // CRITICAL:
      // Return the token from the API response,
      // not the old React state and not a fake fallback.
      return returnedToken;

    } catch (err) {
      console.error(
        'Order creation failed:',
        err
      );

      // DO NOT generate a fake #POST-xxxx-IN token.
      // A fake token causes the confirmation page to
      // request an order that does not exist.
      throw err;
    }
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
        orderToken,
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
    throw new Error(
      "useLetter must be used within a LetterProvider"
    );
  }

  return context;
}