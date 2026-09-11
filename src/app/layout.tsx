import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Dancing_Script } from "next/font/google";
import "./globals.css";
import { LetterProvider } from "@/context/LetterContext";
import { BRAND } from "@/config/brand";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dancing = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRAND.name} — Some things are better said on paper`,
  description: "Handcrafted physical letter delivery service. Write your heart out online, customize envelopes, dried botanicals, and golden wax seals for anonymous campus delivery.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} ${dancing.variable} h-full antialiased selection:bg-[#EAD5D0] selection:text-[#3E3A35]`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FDFBF7] text-[#2A2724] relative overflow-x-hidden">
        <LetterProvider>
          {children}
        </LetterProvider>
      </body>
    </html>
  );
}
