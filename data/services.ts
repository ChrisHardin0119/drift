export interface ServiceChange {
  id: string;
  date: string;
  type: 'price_increase' | 'price_decrease' | 'feature_removal' | 'feature_addition' | 'policy_change' | 'free_tier_change';
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  oldValue?: string;
  newValue?: string;
}

export interface TrackedService {
  id: string;
  name: string;
  category: string;
  price: number;
  billingCycle: 'monthly' | 'yearly' | 'weekly';
  dateAdded: string;
  priceHistory: { date: string; price: number }[];
  changes: ServiceChange[];
  icon?: string;
  color?: string;
  url?: string;
}

export const popularServices = [
  // === STREAMING: Netflix ===
  { name: 'Netflix (Standard w/ Ads)', category: 'streaming', defaultPrice: 7.99, color: '#E50914' },
  { name: 'Netflix (Standard)', category: 'streaming', defaultPrice: 17.99, color: '#E50914' },
  { name: 'Netflix (Premium 4K)', category: 'streaming', defaultPrice: 24.99, color: '#E50914' },

  // === STREAMING: Disney+ Standalone ===
  { name: 'Disney+ (Basic w/ Ads)', category: 'streaming', defaultPrice: 9.99, color: '#113CCF' },
  { name: 'Disney+ (Premium No Ads)', category: 'streaming', defaultPrice: 18.99, color: '#113CCF' },

  // === STREAMING: Hulu Standalone ===
  { name: 'Hulu (w/ Ads)', category: 'streaming', defaultPrice: 9.99, color: '#1CE783' },
  { name: 'Hulu (No Ads)', category: 'streaming', defaultPrice: 18.99, color: '#1CE783' },
  { name: 'Hulu + Live TV', category: 'streaming', defaultPrice: 82.99, color: '#1CE783' },

  // === STREAMING: Disney+/Hulu Duo Bundle ===
  { name: 'Disney+ & Hulu Bundle (w/ Ads)', category: 'streaming', defaultPrice: 12.99, color: '#113CCF' },
  { name: 'Disney+ & Hulu Bundle (No Ads)', category: 'streaming', defaultPrice: 19.99, color: '#113CCF' },

  // === STREAMING: Disney+/Hulu/Max Triple Bundle ===
  { name: 'Disney+/Hulu/Max Bundle (w/ Ads)', category: 'streaming', defaultPrice: 19.99, color: '#113CCF' },
  { name: 'Disney+/Hulu/Max Bundle (No Ads)', category: 'streaming', defaultPrice: 32.99, color: '#113CCF' },

  // === STREAMING: Max (HBO) Standalone ===
  { name: 'Max (Basic w/ Ads)', category: 'streaming', defaultPrice: 10.99, color: '#002BE7' },
  { name: 'Max (Standard)', category: 'streaming', defaultPrice: 18.49, color: '#002BE7' },
  { name: 'Max (Premium Ultimate)', category: 'streaming', defaultPrice: 22.99, color: '#002BE7' },

  // === STREAMING: Others ===
  { name: 'Apple TV+', category: 'streaming', defaultPrice: 12.99, color: '#000000' },
  { name: 'Amazon Prime (includes Video)', category: 'streaming', defaultPrice: 14.99, color: '#00A8E1' },
  { name: 'Peacock (Premium w/ Ads)', category: 'streaming', defaultPrice: 10.99, color: '#000000' },
  { name: 'Peacock (Premium Plus)', category: 'streaming', defaultPrice: 16.99, color: '#000000' },
  { name: 'Paramount+ (Essential w/ Ads)', category: 'streaming', defaultPrice: 8.99, color: '#0064FF' },
  { name: 'Paramount+ (w/ Showtime)', category: 'streaming', defaultPrice: 13.99, color: '#0064FF' },

  // === STREAMING: YouTube ===
  { name: 'YouTube Premium (Individual)', category: 'streaming', defaultPrice: 13.99, color: '#FF0000' },
  { name: 'YouTube Premium (Family)', category: 'streaming', defaultPrice: 22.99, color: '#FF0000' },
  { name: 'YouTube Premium (Student)', category: 'streaming', defaultPrice: 7.99, color: '#FF0000' },
  { name: 'YouTube Premium Lite (Ad-free only)', category: 'streaming', defaultPrice: 7.99, color: '#FF0000' },

  // === MUSIC: Spotify ===
  { name: 'Spotify Premium (Individual)', category: 'music', defaultPrice: 13.00, color: '#1DB954' },
  { name: 'Spotify Premium (Duo)', category: 'music', defaultPrice: 19.00, color: '#1DB954' },
  { name: 'Spotify Premium (Family)', category: 'music', defaultPrice: 22.00, color: '#1DB954' },
  { name: 'Spotify Premium (Student)', category: 'music', defaultPrice: 7.00, color: '#1DB954' },

  // === MUSIC: Apple Music ===
  { name: 'Apple Music (Individual)', category: 'music', defaultPrice: 10.99, color: '#FA243C' },
  { name: 'Apple Music (Family)', category: 'music', defaultPrice: 16.99, color: '#FA243C' },
  { name: 'Apple Music (Student)', category: 'music', defaultPrice: 5.99, color: '#FA243C' },

  // === MUSIC: YouTube Music ===
  { name: 'YouTube Music (Individual)', category: 'music', defaultPrice: 10.99, color: '#FF0000' },
  { name: 'YouTube Music (Family)', category: 'music', defaultPrice: 16.99, color: '#FF0000' },
  { name: 'Tidal (Individual)', category: 'music', defaultPrice: 10.99, color: '#000000' },

  // === AI TOOLS: Claude (Anthropic) ===
  { name: 'Claude Pro', category: 'ai', defaultPrice: 20.00, color: '#D4A574' },
  { name: 'Claude Max 5x', category: 'ai', defaultPrice: 100.00, color: '#D4A574' },
  { name: 'Claude Max 20x', category: 'ai', defaultPrice: 200.00, color: '#D4A574' },
  { name: 'Claude Team (per user)', category: 'ai', defaultPrice: 30.00, color: '#D4A574' },

  // === AI TOOLS: ChatGPT (OpenAI) ===
  { name: 'ChatGPT Go', category: 'ai', defaultPrice: 8.00, color: '#10A37F' },
  { name: 'ChatGPT Plus', category: 'ai', defaultPrice: 20.00, color: '#10A37F' },
  { name: 'ChatGPT Pro', category: 'ai', defaultPrice: 200.00, color: '#10A37F' },
  { name: 'ChatGPT Team (per user)', category: 'ai', defaultPrice: 30.00, color: '#10A37F' },

  // === AI TOOLS: Others ===
  { name: 'Gemini Advanced (Google)', category: 'ai', defaultPrice: 19.99, color: '#4285F4' },
  { name: 'Copilot Pro (Microsoft)', category: 'ai', defaultPrice: 20.00, color: '#0078D4' },
  { name: 'Perplexity Pro', category: 'ai', defaultPrice: 20.00, color: '#1FB8CD' },

  // === PRODUCTIVITY ===
  { name: 'Adobe Creative Cloud (All Apps)', category: 'productivity', defaultPrice: 59.99, color: '#FF0000' },
  { name: 'Adobe Photography Plan', category: 'productivity', defaultPrice: 9.99, color: '#FF0000' },
  { name: 'Microsoft 365 Personal', category: 'productivity', defaultPrice: 9.99, color: '#0078D4' },
  { name: 'Microsoft 365 Family', category: 'productivity', defaultPrice: 12.99, color: '#0078D4' },
  { name: 'Notion Plus', category: 'productivity', defaultPrice: 10.00, color: '#000000' },
  { name: 'Canva Pro', category: 'productivity', defaultPrice: 14.99, color: '#00C4CC' },

  // === CLOUD STORAGE ===
  { name: 'iCloud+ (50GB)', category: 'cloud', defaultPrice: 0.99, color: '#3693F3' },
  { name: 'iCloud+ (200GB)', category: 'cloud', defaultPrice: 2.99, color: '#3693F3' },
  { name: 'iCloud+ (2TB)', category: 'cloud', defaultPrice: 9.99, color: '#3693F3' },
  { name: 'Google One (100GB)', category: 'cloud', defaultPrice: 2.99, color: '#4285F4' },
  { name: 'Google One (2TB)', category: 'cloud', defaultPrice: 9.99, color: '#4285F4' },
  { name: 'Dropbox Plus', category: 'cloud', defaultPrice: 11.99, color: '#0061FF' },

  // === GAMING ===
  { name: 'Xbox Game Pass Core', category: 'gaming', defaultPrice: 9.99, color: '#107C10' },
  { name: 'Xbox Game Pass Standard', category: 'gaming', defaultPrice: 14.99, color: '#107C10' },
  { name: 'Xbox Game Pass Ultimate', category: 'gaming', defaultPrice: 19.99, color: '#107C10' },
  { name: 'PlayStation Plus Essential', category: 'gaming', defaultPrice: 9.99, color: '#003791' },
  { name: 'PlayStation Plus Extra', category: 'gaming', defaultPrice: 14.99, color: '#003791' },
  { name: 'PlayStation Plus Premium', category: 'gaming', defaultPrice: 17.99, color: '#003791' },
  { name: 'Nintendo Switch Online', category: 'gaming', defaultPrice: 3.99, color: '#E60012' },
  { name: 'Nintendo Switch Online + Expansion', category: 'gaming', defaultPrice: 4.17, color: '#E60012' },

  // === VPN & SECURITY ===
  { name: 'NordVPN (monthly)', category: 'vpn', defaultPrice: 12.99, color: '#4687FF' },
  { name: 'ExpressVPN (monthly)', category: 'vpn', defaultPrice: 12.95, color: '#DA3940' },

  // === SOCIAL ===
  { name: 'X Premium (Basic)', category: 'social', defaultPrice: 3.00, color: '#000000' },
  { name: 'X Premium', category: 'social', defaultPrice: 8.00, color: '#000000' },
  { name: 'X Premium+', category: 'social', defaultPrice: 16.00, color: '#000000' },
  { name: 'LinkedIn Premium Career', category: 'social', defaultPrice: 29.99, color: '#0A66C2' },
  { name: 'LinkedIn Premium Business', category: 'social', defaultPrice: 59.99, color: '#0A66C2' },

  // === HEALTH & FITNESS ===
  { name: 'Headspace', category: 'health', defaultPrice: 12.99, color: '#F47D31' },
  { name: 'Strava', category: 'health', defaultPrice: 11.99, color: '#FC4C02' },
  { name: 'Apple Fitness+', category: 'health', defaultPrice: 9.99, color: '#FA243C' },

  // === ESPN (add-ons) ===
  { name: 'ESPN Select', category: 'streaming', defaultPrice: 12.99, color: '#C8102E' },
  { name: 'ESPN Unlimited', category: 'streaming', defaultPrice: 29.99, color: '#C8102E' },
];
