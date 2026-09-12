"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Check, Mail, PenLine, Truck, Heart } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

type TimelineItem = {
  stage: string;
  created_at: string;
};

type OrderData = {
  order: {
    id: string;
    order_token: string;
    status: string;
    total_cents: number;
    payment_status: string;
    created_at: string;
  };
  recipient: {
    name: string;
    recipient_type: string;
    department_or_school: string;
    year: string | number | null;
    delivery_location: string;
  } | null;
  customization: {
    flowers_enabled: boolean;
    flower_type: string | null;
    wax_seal_enabled: boolean;
    envelope_color: string;
  } | null;
  timeline: TimelineItem[];
};

type Stage = {
  key: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const STAGES: Stage[] = [
  {
    key: "ORDER_RECEIVED",
    title: "Order received",
    description: "Your letter has been received and is being prepared.",
    icon: <Mail className="w-5 h-5" />,
  },
  {
    key: "IN_PRODUCTION",
    title: "Being prepared",
    description: "Your letter is being written and carefully packaged.",
    icon: <PenLine className="w-5 h-5" />,
  },
  {
    key: "READY_FOR_DELIVERY",
    title: "Ready for delivery",
    description: "Your letter is ready and waiting to begin its journey.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    key: "OUT_FOR_DELIVERY",
    title: "Out for delivery",
    description: "Your letter is on its way to the recipient.",
    icon: <Truck className="w-5 h-5" />,
  },
  {
    key: "DELIVERED",
    title: "Delivered",
    description: "Your letter has reached its destination.",
    icon: <Check className="w-5 h-5" />,
  },
];

function formatDate(dateString: string) {
  try {
    return new Date(dateString).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

function getStageIndex(status: string) {
  const normalized = status.toUpperCase();

  const index = STAGES.findIndex((stage) => stage.key === normalized);

  if (index !== -1) {
    return index;
  }

  // Handle a few possible backend status names.
  if (
    normalized.includes("DELIVER")
  ) {
    return 4;
  }

  if (
    normalized.includes("OUT_FOR") ||
    normalized.includes("DISPATCH")
  ) {
    return 3;
  }

  if (
    normalized.includes("READY") ||
    normalized.includes("PACK")
  ) {
    return 2;
  }

  if (
    normalized.includes("PRODUCTION") ||
    normalized.includes("PREPAR")
  ) {
    return 1;
  }

  return 0;
}

function TrackContent() {
  const searchParams = useSearchParams();

  // Support BOTH formats so we don't have to modify the confirmation page.
  //
  // /track?order_token=ORD-xxxx
  // /track?orderId=ORD-xxxx
  //
  const requestedToken =
    searchParams.get("order_token") ||
    searchParams.get("orderId") ||
    "";

  const [orderToken, setOrderToken] = useState(requestedToken);
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(Boolean(requestedToken));
  const [searched, setSearched] = useState(Boolean(requestedToken));
  const [error, setError] = useState("");

  const trackOrder = async (token = orderToken) => {
    const cleanToken = token.trim();

    setSearched(true);
    setError("");
    setOrder(null);

    if (!cleanToken) {
      setError("Please enter your order ID.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `/api/orders?order_token=${encodeURIComponent(cleanToken)}`,
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || "Order not found");
      }

      setOrder(data);
    } catch (err) {
      console.error("Failed to fetch order:", err);

      setError(
        err instanceof Error
          ? err.message
          : "We couldn't find that order."
      );
    } finally {
      setLoading(false);
    }
  };

  // Automatically load an order when arriving from confirmation page.
  useEffect(() => {
    if (requestedToken) {
      trackOrder(requestedToken);
    }
    // We intentionally only react to the URL token.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestedToken]);

  const currentStageIndex = order
    ? getStageIndex(order.order.status)
    : -1;

  // Use actual timeline timestamps when available.
  const timelineByStage = new Map(
    (order?.timeline || []).map((item) => [
      item.stage.toUpperCase(),
      item,
    ])
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2A2724]">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-10 sm:py-14">
        {/* Header */}
        <header className="text-center mb-9">
          <span className="text-xs font-serif uppercase tracking-widest text-[#C5A059]">
            Order tracking
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl mt-1">
            Where is your letter?
          </h1>

          <p className="font-serif text-sm sm:text-base text-[#6E655A] mt-2 max-w-xl mx-auto">
            Enter your order ID and we&apos;ll show you where your letter
            is in its journey.
          </p>
        </header>

        {/* Search */}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            trackOrder();
          }}
          className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
        >
          <input
            value={orderToken}
            onChange={(event) => {
              setOrderToken(event.target.value);
              setError("");
            }}
            placeholder="ORD-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            className="flex-1 px-5 py-3 rounded-full border border-[#D8CFC2] bg-white font-serif focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
          />

          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center items-center gap-2 bg-[#2A2724] text-[#FDFBF7] rounded-full px-6 py-3 font-serif disabled:opacity-60"
          >
            <Search className="w-4 h-4" />

            {loading ? "Searching..." : "Track Letter"}
          </button>
        </form>

        {/* Error */}
        {searched && error && !loading && (
          <div className="text-center mt-8">
            <p className="font-serif text-sm text-[#7A7369]">
              {error}
            </p>

            <p className="font-serif text-xs text-[#9A9186] mt-2">
              Please check your order ID and try again.
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center mt-10">
            <p className="font-serif text-sm text-[#7A7369]">
              Looking up your letter...
            </p>
          </div>
        )}

        {/* Order */}
        {order && !loading && (
          <section className="mt-10 bg-white/80 border border-[#E5DDD2] rounded-2xl p-6 sm:p-8 shadow-xs">
            {/* Order header */}
            <div className="pb-6 border-b border-[#EAE2D7]">
              <span className="text-xs uppercase tracking-widest font-serif text-[#8C8377]">
                Order ID
              </span>

              <div className="font-serif text-lg sm:text-xl text-[#9E7D3A] mt-1 break-all">
                {order.order.order_token}
              </div>

              <h2 className="font-serif text-2xl mt-4">
                A note for{" "}
                {order.recipient?.name || "someone special"}
              </h2>

              {order.recipient?.delivery_location && (
                <p className="font-serif text-sm text-[#7A7369] mt-2">
                  Delivery location:{" "}
                  {order.recipient.delivery_location}
                </p>
              )}
            </div>

            {/* Timeline */}
            <div className="mt-8">
              {STAGES.map((stage, index) => {
                const completed = index < currentStageIndex;
                const current = index === currentStageIndex;
                const future = index > currentStageIndex;

                const timelineEntry = timelineByStage.get(stage.key);

                return (
                  <div
                    key={stage.key}
                    className="relative flex gap-4"
                  >
                    {/* Connecting line */}
                    {index < STAGES.length - 1 && (
                      <div
                        className={`absolute left-[19px] top-10 w-px h-[calc(100%-1rem)] ${
                          completed
                            ? "bg-[#7A9A84]"
                            : "bg-[#E5DDD2]"
                        }`}
                      />
                    )}

                    {/* Icon */}
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className={[
                          "w-10 h-10 rounded-full flex items-center justify-center border transition-all",
                          completed
                            ? "bg-[#7A9A84] border-[#7A9A84] text-white"
                            : "",
                          current
                            ? "bg-[#FCF8EE] border-[#C5A059] text-[#C5A059] ring-2 ring-[#E6D4AA]"
                            : "",
                          future
                            ? "bg-[#FDFBF7] border-[#D8CFC2] text-[#B8B0A5]"
                            : "",
                        ].join(" ")}
                      >
                        {completed ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          stage.icon
                        )}
                      </div>
                    </div>

                    {/* Text */}
                    <div className="flex-1 pb-8">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <h3
                          className={`font-serif text-lg ${
                            future
                              ? "text-[#A39A8F]"
                              : "text-[#2A2724]"
                          }`}
                        >
                          {stage.title}
                        </h3>

                        {timelineEntry && (
                          <span className="text-[11px] font-serif uppercase tracking-wide text-[#A39A8F]">
                            {formatDate(timelineEntry.created_at)}
                          </span>
                        )}
                      </div>

                      <p
                        className={`font-serif text-sm leading-relaxed mt-1 ${
                          future
                            ? "text-[#B0A89E]"
                            : "text-[#7A7369]"
                        }`}
                      >
                        {stage.description}
                      </p>

                      {current && (
                        <span className="inline-block mt-2 text-[10px] uppercase tracking-widest font-serif text-[#C5A059]">
                          Current status
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Current status */}
            <div className="mt-2 pt-6 border-t border-[#EAE2D7] text-center">
              <span className="text-[10px] uppercase tracking-widest font-serif text-[#8C8377]">
                Current status
              </span>

              <p className="font-serif text-lg mt-1">
                {STAGES[currentStageIndex]?.title ||
                  "Order received"}
              </p>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FDFBF7]" />
      }
    >
      <TrackContent />
    </Suspense>
  );
}