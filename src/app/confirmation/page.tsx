"use client";

import Link from "next/link";
import { Heart, MapPin } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useLetter } from "@/context/LetterContext";
import { Suspense } from "react";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderTokenFromUrl = searchParams.get("order_token") || "";
  const { orderToken } = useLetter();

  const activeOrderToken =
    orderTokenFromUrl || orderToken || "#POST-8942-IN";

  useEffect(() => {
    if (orderTokenFromUrl) {
      fetch(
        `/api/orders?order_token=${encodeURIComponent(orderTokenFromUrl)}`,
        {
          credentials: "include",
        }
      )
        .then((res) => {
          if (!res.ok) throw new Error("Order not found");
          return res.json();
        })
        .then((data) => {
          console.log("Order fetched:", data);
        })
        .catch((err) => {
          console.error("Failed to fetch order:", err);
        });
    }
  }, [orderTokenFromUrl]);

  const orderId = activeOrderToken;

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2A2724]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <section className="w-full max-w-2xl text-center bg-[#FAF7F2] border border-[#E5DDD2] rounded-2xl p-8 sm:p-14 shadow-paper relative overflow-hidden">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#FCF8EE] border border-[#E6D4AA] flex items-center justify-center text-[#C5A059]">
            <Heart className="w-6 h-6" />
          </div>

          <span className="block mt-6 text-xs font-serif uppercase tracking-widest text-[#C5A059]">
            Order confirmed
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl mt-2">
            Your letter is on its way.
          </h1>

          <p className="font-serif text-sm sm:text-base text-[#6E655A] leading-relaxed mt-3 max-w-md mx-auto">
            Somewhere on campus, someone is about to receive a little piece of
            your heart.
          </p>

          <div className="my-8 py-4 border-y border-[#EAE2D7]">
            <span className="block text-[11px] uppercase tracking-widest text-[#8C8377]">
              Order ID
            </span>

            <strong className="font-serif text-2xl text-[#9E7D3A]">
              {orderId}
            </strong>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/write"
              className="inline-flex justify-center items-center gap-2 px-6 py-3 rounded-full bg-[#2A2724] text-[#FDFBF7] font-serif"
            >
              <Heart className="w-4 h-4 text-[#E5B8AE]" />
              Write another letter
            </Link>

            <Link
              href={`/track?orderId=${encodeURIComponent(orderId)}`}
              className="inline-flex justify-center items-center gap-2 px-6 py-3 rounded-full border border-[#D8CFC2] font-serif text-[#5C5449] hover:bg-[#F2EDE4]"
            >
              <MapPin className="w-4 h-4 text-[#C5A059]" />
              Check Order Status
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FDFBF7]" />
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}