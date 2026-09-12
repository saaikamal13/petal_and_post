export interface TrackedOrderStage {
  key: 'words_received' | 'being_brought_to_life' | 'being_prepared' | 'on_its_way' | 'delivered';
  icon: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  timestamp?: string;
}

export interface TrackedOrder {
  id: string;
  createdAt: string;
  status: 'words_received' | 'being_brought_to_life' | 'being_prepared' | 'on_its_way' | 'delivered';
  recipient: {
    name: string;
    department: string;
    year: string;
    registrationNumber?: string;
    hostel?: string;
    roomNumber?: string;
    deliveryInstructions?: string;
  };
  letter: {
    writingStyle: 'classic' | 'calligraphy';
    closing: string;
    signature: string;
    charCount: number;
  };
  customization: {
    envelopeColor: string;
    flowersEnabled: boolean;
    flowerType: string;
    waxSealEnabled: boolean;
  };
  pricing: {
    total: number;
  };
  timeline: TrackedOrderStage[];
}

export const INITIAL_MOCK_ORDERS: Record<string, TrackedOrder> = {
  "POST-8942-IN": {
    id: "#POST-8942-IN",
    createdAt: "11 Sep · 4:20 PM",
    status: "on_its_way",
    recipient: {
      name: "Recipient",
      department: "Computer Science & Engineering",
      year: "3rd Year (Junior)",
      hostel: "Meera Bhawan (Girls Hostel)",
      roomNumber: "Room 214",
    },
    letter: {
      writingStyle: "classic",
      closing: "",
      signature: "",
      charCount: 462,
    },
    customization: {
      envelopeColor: "blush",
      flowersEnabled: true,
      flowerType: "babys-breath",
      waxSealEnabled: true,
    },
    pricing: {
      total: 99,
    },
    timeline: [
      {
        key: "words_received",
        icon: "✉️",
        title: "Words Received",
        description: "Your letter has safely reached us.",
        status: "completed",
        timestamp: "11 Sep · 4:20 PM",
      },
      {
        key: "being_brought_to_life",
        icon: "🖋️",
        title: "Being Brought to Life",
        description: "Our team is carefully preparing your handwritten letter.",
        status: "completed",
        timestamp: "11 Sep · 5:10 PM",
      },
      {
        key: "being_prepared",
        icon: "🌸",
        title: "Being Prepared for Its Journey",
        description: "Your letter is being folded, sealed and dressed with the details you chose.",
        status: "completed",
        timestamp: "11 Sep · 6:45 PM",
      },
      {
        key: "on_its_way",
        icon: "🕊️",
        title: "On Its Way",
        description: "Your letter has left us and is making its way to its recipient.",
        status: "current",
        timestamp: "11 Sep · 7:30 PM",
      },
      {
        key: "delivered",
        icon: "💌",
        title: "Delivered",
        description: "Your letter has found its way to them.",
        status: "upcoming",
        timestamp: "11 Sep · 8:00 PM",
      },
    ],
  },
};

const TRACKING_STORAGE_KEY = "petal_and_post_tracked_orders_v1";

export async function fetchTrackedOrderFromApi(orderToken: string): Promise<TrackedOrder | null> {
  // Try fetching from the Supabase-backed API
  try {
    const res = await fetch(`/api/orders?order_token=${encodeURIComponent(orderToken)}`, {
      credentials: 'include',
    });
    if (!res.ok) return null;
    const data = await res.json();
    // The API returns order data; normalize it to TrackedOrder format
    if (!data) return null;
    // Map API response to TrackedOrder - this is a simplified mapping
    // In a full implementation, we'd map all fields from the Supabase tables
    return {
      id: data.order_token || orderToken,
      createdAt: data.createdAt || "Today · Just now",
      status: data.status || "being_brought_to_life",
      recipient: {
        name: data.recipient?.name || "Recipient",
        department: data.recipient?.department_or_school || "Campus Resident",
        year: data.recipient?.year || "Student",
      },
      letter: {
        writingStyle: data.letter?.writing_style || "classic",
        closing: data.letter?.closing || "With love,",
        signature: data.letter?.signature || "Anonymous",
        charCount: data.letter?.charCount || 280,
      },
      customization: {
        envelopeColor: data.customizations?.envelope_color || "ivory",
        flowersEnabled: data.customizations?.flowers_enabled !== false,
        flowerType: data.customizations?.flower_type || "babys-breath",
        waxSealEnabled: data.customizations?.wax_seal_enabled !== false,
      },
      pricing: {
        total: data.total_cents ? Math.round(data.total_cents / 100) : 99,
      },
      timeline: [
        {
          key: "words_received",
          icon: "✉️",
          title: "Words Received",
          description: "Your letter has safely reached us.",
          status: "completed",
          timestamp: data.createdAt || "Today · Just now",
        },
        {
          key: "being_brought_to_life",
          icon: "🖋️",
          title: "Being Brought to Life",
          description: "Our team is carefully preparing your handwritten letter.",
          status: "current",
          timestamp: "In progress",
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
  } catch {
    return null;
  }
  return null;
}

export function getTrackedOrder(orderIdInput: string): TrackedOrder | null {
  if (!orderIdInput) return null;
  const cleanId = orderIdInput.trim().replace(/^#/, '').toUpperCase();

  // Try retrieving from local storage first
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(TRACKING_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed[cleanId]) return parsed[cleanId];
        // Also check with #
        if (parsed[`#${cleanId}`]) return parsed[`#${cleanId}`];
      }
    } catch {
      // fallback
    }
  }

  // Check initial mock data
  if (INITIAL_MOCK_ORDERS[cleanId]) return INITIAL_MOCK_ORDERS[cleanId];

  // Try API lookup for new Supabase-backed orders
  // Note: This is async; callers should await the result
  // We return null here and let the caller handle the async fetch
  return null;
}

export function saveTrackedOrder(order: TrackedOrder) {
  if (typeof window === 'undefined') return;
  try {
    const cleanId = order.id.replace(/^#/, '').toUpperCase();
    const stored = localStorage.getItem(TRACKING_STORAGE_KEY);
    const orders = stored ? JSON.parse(stored) : { ...INITIAL_MOCK_ORDERS };
    orders[cleanId] = order;
    localStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.warn("Could not save tracked order:", e);
  }
}