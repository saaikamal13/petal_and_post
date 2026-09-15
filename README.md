# Petal & Post 💌
*Anonymous Physical Letter Delivery Service for College Campuses*

> **"Some things are better said on paper."**  
> Write something meaningful for someone you love. We'll turn your words into a physical letter they can hold onto.

---

## 🌸 Visual Mood & Design Philosophy
- **Atmosphere:** Modern digital stationery + handwritten letters + pressed florals
- **Mood:** Peaceful, intimate, warm, elegant, nostalgic, premium but accessible
- **Palette:** Warm Ivory (`#FDFBF7`, `#FAF7F2`), Blush Pink (`#F8ECE9`), Powder Blue (`#EBF2F7`), Sage Green (`#EDF3EE`), Kraft Paper (`#EADBC8`), Charcoal ink (`#2A2724`), and Antique Gold (`#C5A059`)
- **Typography:** Classical serif (`Cormorant Garamond`), flowing cursive (`Dancing Script`), and clean sans (`Plus Jakarta Sans`)

---

## 🚀 Pages & User Flow

1. **Home Page (`/`)**:
   - Emotional Hero with physical stationery composition (open letter, pastel envelope, dried flowers, vintage postmark stamp)
   - *"Make someone's day"* — 4 interactive prompt cards ("Tell someone you miss them", "Say thank you", "Celebrate something special", "Say what you've never been able to say") that launch the editor preloaded with inspiring text
   - *"How it works"* — 4-step physical delivery journey
   - Large emotional CTA & stationery footer with FAQ & privacy modals

2. **Letter Studio (`/write`)**:
   - **Realistic Letter Paper:** Deckled edges, laid paper grain, classical date header, editable "Dear [Name]," salutation, live character counter, closing phrase, and signature line
   - **Writing Styles:** Classic Pen vs. Handwritten Calligraphy with real-time typography updates
   - **Customization Studio ("Make it special"):**
     - **Dried Botanicals:** Baby's Breath, Rose, Daisy, Tulip, Mixed Bouquet (+₹30)
     - **Golden Wax Seal:** 3D embossed stamp with selectable motifs (Classic Bloom, Botanical Fern, Intertwined Hearts, Monogram) (+₹20)
     - **Envelope Paper:** Ivory Cream, Blush Pink, Powder Blue, Sage Green, Kraft Paper
     - **Writing Style:** Classic Pen (₹0) vs. Calligraphy (+₹10)
   - **Live Envelope Preview:** Watch the envelope flap, floral sprig, and golden seal update simultaneously! Flips between seal side and address face.
   - **Mobile Optimizations:** Tab switcher between "Letter Paper" and "Envelope Preview", with sticky action bar

3. **Campus Delivery Details (`/recipient`)**:
   - Required fields: Recipient name, College, Department / Stream, Year of study
   - Optional precision fields: Roll number, Hostel / Hall of residence, Room number, Phone, and special delivery notes
   - Quick search & suggestions for top Indian college campuses
   - **"Keep me anonymous":** Reassuring privacy protection with 3 modes:
     1. *100% Anonymous* (default)
     2. *Custom Nickname / Monogram*
     3. *No Sender Name*

4. **Review & Order Summary (`/review`)**:
   - Left: Sealed envelope preview with "Peek at letter contents" modal
   - Right: Order summary with checkmarked customization breakdown, recipient campus drop marker, itemized pricing breakdown, and "Send the Letter 💌" action

5. **Celebratory Success State**:
   - Gentle falling floral confetti animation
   - Physical envelope with wax seal gleaming
   - Headline: *"Your letter is on its way."*
   - Supporting text: *"Somewhere, someone is about to have a very good day."*
   - Mock tracking order ID (e.g. `#POST-8942-IN`) with 1-click copy
   - Step-by-step production & campus dispatch timeline
   - Actions to "Write Another Letter" or return to "Home"

---

## 🛠️ Architecture & Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 with custom theme tokens & procedural paper grain
- **Icons:** Lucide React
- **Celebration:** Canvas Confetti
- **State Management:** React Context (`LetterContext`) with automatic `localStorage` synchronization
- **Brand Configuration:** Centralized config in `src/config/brand.ts` for slogans, options, pricing, and campus lists

---


