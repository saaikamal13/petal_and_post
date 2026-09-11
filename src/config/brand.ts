export interface FlowerOption {
  id: 'babys-breath' | 'rose' | 'daisy' | 'tulip' | 'mixed-bouquet';
  name: string;
  botanicalName: string;
  description: string;
  meaning: string;
  price: number;
}

export interface EnvelopeColorOption {
  id: 'ivory' | 'blush' | 'powder-blue' | 'sage' | 'kraft';
  name: string;
  hex: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  description: string;
}

export interface WritingStyleOption {
  id: 'classic' | 'calligraphy';
  name: string;
  fontClass: string;
  description: string;
  sampleText: string;
  price: number;
}

export const BRAND = {
  name: "Petal & Post",
  shortName: "Petal & Post",
  tagline: "Some things are better said on paper.",
  subTagline: "Write something meaningful for someone you love. We'll turn your words into a letter they can hold onto.",
  emotionalHeadline: "Your words. Their moment.",
  discreetGuarantee: "100% Anonymous & Discreet Campus Delivery",
  pricing: {
    baseLetter: 49,
    calligraphy: 15,
    flowers: 30,
    waxSeal: 20,
    currencySymbol: "₹",
  },
  flowers: [
    {
      id: 'babys-breath',
      name: "Baby's Breath",
      botanicalName: "Gypsophila elegans",
      description: "Delicate clouds of airy dried white florets.",
      meaning: "Everlasting love, sincerity & innocence",
      price: 30,
    },
    {
      id: 'rose',
      name: "Rose",
      botanicalName: "Rosa damascena",
      description: "A pressed crimson & blush rose petal sprig.",
      meaning: "Deep affection, admiration & devotion",
      price: 30,
    },
    {
      id: 'daisy',
      name: "Daisy",
      botanicalName: "Bellis perennis",
      description: "Sun-dried gentle chamomile daisy stems.",
      meaning: "Cheer, new beginnings & warm friendships",
      price: 30,
    },
    {
      id: 'tulip',
      name: "Tulip",
      botanicalName: "Tulipa gesneriana",
      description: "Graceful pressed pastel petal silhouette.",
      meaning: "Perfect caring, quiet beauty & grace",
      price: 30,
    },
    {
      id: 'mixed-bouquet',
      name: "Mixed Bouquet",
      botanicalName: "Botanical Medley",
      description: "Curated dried lavender, eucalyptus & petals.",
      meaning: "A complete heartfelt blessing",
      price: 30,
    },
  ] as FlowerOption[],
  envelopeColors: [
    {
      id: 'ivory',
      name: 'Ivory Cream',
      hex: '#FAF7F2',
      bgClass: 'bg-[#FAF7F2]',
      borderClass: 'border-[#E8E1D7]',
      textClass: 'text-[#3E3A35]',
      description: 'Warm, timeless deckle-edged stationery tone',
    },
    {
      id: 'blush',
      name: 'Blush Pink',
      hex: '#F8ECE9',
      bgClass: 'bg-[#F8ECE9]',
      borderClass: 'border-[#EAD5D0]',
      textClass: 'text-[#4A3835]',
      description: 'Whisper-soft romantic pastel hue',
    },
    {
      id: 'powder-blue',
      name: 'Powder Blue',
      hex: '#EBF2F7',
      bgClass: 'bg-[#EBF2F7]',
      borderClass: 'border-[#D2E0EB]',
      textClass: 'text-[#2E3C47]',
      description: 'Peaceful, nostalgic morning sky tint',
    },
    {
      id: 'sage',
      name: 'Sage Green',
      hex: '#EDF3EE',
      bgClass: 'bg-[#EDF3EE]',
      borderClass: 'border-[#D3DFD5]',
      textClass: 'text-[#334237]',
      description: 'Earthy, serene wild eucalyptus green',
    },
    {
      id: 'kraft',
      name: 'Kraft Paper',
      hex: '#EADBC8',
      bgClass: 'bg-[#EADBC8]',
      borderClass: 'border-[#D4C1A8]',
      textClass: 'text-[#423627]',
      description: 'Rustic, vintage fibrous recycled paper',
    },
  ] as EnvelopeColorOption[],
  waxSeal: {
    name: 'Golden Wax Seal',
    price: 20,
    description: 'Solid metallic antique gold sealing wax stamped over the envelope fold.',
  },
  writingStyles: [
    {
      id: 'classic',
      name: 'Classic / Fountain Pen',
      fontClass: 'font-serif',
      description: 'Elegant fountain pen style with refined serif rhythm.',
      sampleText: 'My dearest friend, some words take time to find...',
      price: 0,
    },
    {
      id: 'calligraphy',
      name: 'Calligraphy',
      fontClass: 'font-script',
      description: 'Flowing cursive script with delicate ink flourishes.',
      sampleText: 'With every breath, a quiet reminder of our fondest memories...',
      price: 15,
    },
  ] as WritingStyleOption[],
  departments: [
    "Computer Science & Engineering",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Civil Engineering",
    "Biotechnology",
    "Commerce & Economics",
    "Literature & Humanities",
    "Business Administration",
    "Architecture & Design",
    "Medicine & Health Sciences",
    "Physics / Chemistry / Mathematics"
  ],
  years: [
    "1st Year (Fresher)",
    "2nd Year (Sophomore)",
    "3rd Year (Junior)",
    "4th Year (Senior)",
    "Postgraduate / Masters",
    "PhD / Research Scholar",
    "Faculty / Staff Member"
  ]
};
