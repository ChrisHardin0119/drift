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
  // Amazon Prime moved to Amazon Ecosystem section below
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

  // === STREAMING: Disney+/Hulu/ESPN Triple (Old Bundle) ===
  { name: 'Disney+/Hulu/ESPN Select (w/ Ads)', category: 'streaming', defaultPrice: 20.00, color: '#113CCF' },
  { name: 'Disney+/Hulu/ESPN Select (No Ads)', category: 'streaming', defaultPrice: 30.00, color: '#113CCF' },

  // === STREAMING: Niche/Add-on Services ===
  { name: 'Starz', category: 'streaming', defaultPrice: 10.99, color: '#000000' },
  { name: 'AMC+ (w/ Ads)', category: 'streaming', defaultPrice: 7.99, color: '#1A1A2E' },
  { name: 'AMC+ (No Ads)', category: 'streaming', defaultPrice: 10.99, color: '#1A1A2E' },
  { name: 'BET+', category: 'streaming', defaultPrice: 9.99, color: '#D4145A' },
  { name: 'Discovery+  (w/ Ads)', category: 'streaming', defaultPrice: 5.99, color: '#003B6F' },
  { name: 'Discovery+ (No Ads)', category: 'streaming', defaultPrice: 6.99, color: '#003B6F' },
  { name: 'MGM+', category: 'streaming', defaultPrice: 7.99, color: '#B8860B' },
  { name: 'Hallmark+', category: 'streaming', defaultPrice: 7.99, color: '#8B0000' },

  // === STREAMING: Anime ===
  { name: 'Crunchyroll (Fan)', category: 'streaming', defaultPrice: 9.99, color: '#F47521' },
  { name: 'Crunchyroll (Mega Fan)', category: 'streaming', defaultPrice: 11.99, color: '#F47521' },
  { name: 'Crunchyroll (Ultimate Fan)', category: 'streaming', defaultPrice: 15.99, color: '#F47521' },

  // === AMAZON ECOSYSTEM ===
  { name: 'Amazon Prime (Monthly)', category: 'streaming', defaultPrice: 14.99, color: '#00A8E1' },
  { name: 'Amazon Prime (Annual)', category: 'streaming', defaultPrice: 11.58, color: '#00A8E1' },  // $139/yr
  { name: 'Audible Plus', category: 'streaming', defaultPrice: 7.95, color: '#F79400' },
  { name: 'Audible Premium Plus', category: 'streaming', defaultPrice: 14.95, color: '#F79400' },
  { name: 'Audible Premium Plus (Annual)', category: 'streaming', defaultPrice: 12.46, color: '#F79400' },  // $149.50/yr
  { name: 'Kindle Unlimited', category: 'streaming', defaultPrice: 11.99, color: '#FF9900' },

  // === APPLE BUNDLES ===
  { name: 'Apple One (Individual)', category: 'streaming', defaultPrice: 19.95, color: '#000000' },
  { name: 'Apple One (Family)', category: 'streaming', defaultPrice: 25.95, color: '#000000' },
  { name: 'Apple One (Premier)', category: 'streaming', defaultPrice: 37.95, color: '#000000' },

  // === CARRIER BUNDLES (for awareness — price depends on plan) ===
  { name: 'Verizon: Netflix + Max Bundle (w/ Ads)', category: 'streaming', defaultPrice: 10.00, color: '#CD040B' },
  { name: 'Xfinity StreamSaver (Netflix+Peacock+AppleTV+)', category: 'streaming', defaultPrice: 18.00, color: '#E10A0A' },
  { name: 'Walmart+ Membership', category: 'other', defaultPrice: 12.95, color: '#0071DC' },
  { name: 'Walmart+ Membership (Annual)', category: 'other', defaultPrice: 8.17, color: '#0071DC' },  // $98/yr

  // === ANNUAL PRICING VARIANTS (shown as monthly equivalent) ===
  { name: 'Disney+ Basic (Annual)', category: 'streaming', defaultPrice: 8.33, color: '#113CCF' },  // $99.99/yr
  { name: 'Disney+ Premium (Annual)', category: 'streaming', defaultPrice: 15.83, color: '#113CCF' },  // $189.99/yr
  { name: 'Hulu w/ Ads (Annual)', category: 'streaming', defaultPrice: 8.33, color: '#1CE783' },  // $99.99/yr
  { name: 'Peacock Premium (Annual)', category: 'streaming', defaultPrice: 8.33, color: '#000000' },  // $99.99/yr
  { name: 'Paramount+ Essential (Annual)', category: 'streaming', defaultPrice: 5.00, color: '#0064FF' },  // $59.99/yr
  { name: 'Paramount+ w/ Showtime (Annual)', category: 'streaming', defaultPrice: 9.17, color: '#0064FF' },  // $109.99/yr
  { name: 'Crunchyroll Fan (Annual)', category: 'streaming', defaultPrice: 8.33, color: '#F47521' },  // $99.99/yr
  { name: 'AMC+ (Annual)', category: 'streaming', defaultPrice: 9.17, color: '#1A1A2E' },  // $109.99/yr
  { name: 'BET+ (Annual)', category: 'streaming', defaultPrice: 7.92, color: '#D4145A' },  // $94.99/yr
  { name: 'Spotify Premium Individual (Annual)', category: 'music', defaultPrice: 10.75, color: '#1DB954' },  // $129/yr
  { name: 'Max Basic (Annual)', category: 'streaming', defaultPrice: 8.67, color: '#002BE7' },  // $103.99/yr
  { name: 'Max Standard (Annual)', category: 'streaming', defaultPrice: 14.58, color: '#002BE7' },  // $174.99/yr
  { name: 'Max Premium (Annual)', category: 'streaming', defaultPrice: 18.33, color: '#002BE7' },  // $219.99/yr

  // === GAMING (Annual pricing) ===
  { name: 'PlayStation Plus Essential (Annual)', category: 'gaming', defaultPrice: 6.67, color: '#003791' },  // $79.99/yr
  { name: 'PlayStation Plus Extra (Annual)', category: 'gaming', defaultPrice: 11.25, color: '#003791' },  // $134.99/yr
  { name: 'PlayStation Plus Premium (Annual)', category: 'gaming', defaultPrice: 13.33, color: '#003791' },  // $159.99/yr
  { name: 'Nintendo Switch Online (Annual)', category: 'gaming', defaultPrice: 1.67, color: '#E60012' },  // $19.99/yr
  { name: 'Nintendo Switch Online + Expansion (Annual)', category: 'gaming', defaultPrice: 4.17, color: '#E60012' },  // $49.99/yr

  // === NEWS & MEDIA ===
  { name: 'Apple News+', category: 'news', defaultPrice: 12.99, color: '#FA243C' },
  { name: 'Apple Fitness+', category: 'health', defaultPrice: 9.99, color: '#A2D729' },
  { name: 'The Athletic', category: 'news', defaultPrice: 9.99, color: '#2B2B2B' },
  { name: 'Washington Post', category: 'news', defaultPrice: 12.00, color: '#000000' },
  { name: 'New York Times (All Access)', category: 'news', defaultPrice: 25.00, color: '#000000' },
  { name: 'New York Times (Digital Basic)', category: 'news', defaultPrice: 4.25, color: '#000000' },

  // === LIVE TV ===
  { name: 'YouTube TV', category: 'streaming', defaultPrice: 82.99, color: '#FF0000' },
  { name: 'FuboTV (Entertainment)', category: 'streaming', defaultPrice: 89.99, color: '#1BB58A' },
  { name: 'FuboTV (Choice)', category: 'streaming', defaultPrice: 94.99, color: '#1BB58A' },
  { name: 'FuboTV (Ultimate)', category: 'streaming', defaultPrice: 124.99, color: '#1BB58A' },
  { name: 'FuboTV (Sports + News)', category: 'streaming', defaultPrice: 55.99, color: '#1BB58A' },
  { name: 'Sling TV (Orange)', category: 'streaming', defaultPrice: 45.99, color: '#F57C1F' },
  { name: 'Sling TV (Blue)', category: 'streaming', defaultPrice: 45.99, color: '#0074E4' },
  { name: 'Sling TV (Orange + Blue)', category: 'streaming', defaultPrice: 60.99, color: '#F57C1F' },
  { name: 'Philo (Essential)', category: 'streaming', defaultPrice: 25.00, color: '#4E2A84' },
  { name: 'Philo (Bundle+)', category: 'streaming', defaultPrice: 33.00, color: '#4E2A84' },
  { name: 'DIRECTV STREAM (Entertainment)', category: 'streaming', defaultPrice: 79.99, color: '#00A8E0' },

  // === FOOD DELIVERY ===
  { name: 'DoorDash DashPass', category: 'other', defaultPrice: 9.99, color: '#FF3008' },
  { name: 'Uber One', category: 'other', defaultPrice: 9.99, color: '#000000' },
  { name: 'Grubhub+', category: 'other', defaultPrice: 9.99, color: '#F63440' },
  { name: 'Instacart+', category: 'other', defaultPrice: 9.99, color: '#43B02A' },

  // === DATING ===
  { name: 'Tinder Plus', category: 'other', defaultPrice: 24.99, color: '#FD5068' },
  { name: 'Tinder Gold', category: 'other', defaultPrice: 39.99, color: '#FFD700' },
  { name: 'Tinder Platinum', category: 'other', defaultPrice: 49.99, color: '#C0C0C0' },
  { name: 'Bumble Boost', category: 'other', defaultPrice: 14.99, color: '#FFC629' },
  { name: 'Bumble Premium', category: 'other', defaultPrice: 29.99, color: '#FFC629' },
  { name: 'Hinge+ (HingeX)', category: 'other', defaultPrice: 29.99, color: '#77303F' },

  // === COMMUNICATION ===
  { name: 'Discord Nitro Basic', category: 'productivity', defaultPrice: 2.99, color: '#5865F2' },
  { name: 'Discord Nitro', category: 'productivity', defaultPrice: 9.99, color: '#5865F2' },
  { name: 'Zoom Pro', category: 'productivity', defaultPrice: 13.33, color: '#2D8CFF' },
  { name: 'Slack Pro', category: 'productivity', defaultPrice: 8.75, color: '#4A154B' },

  // === FITNESS & WELLNESS ===
  { name: 'Peloton App', category: 'health', defaultPrice: 12.99, color: '#D40000' },
  { name: 'Peloton App+', category: 'health', defaultPrice: 24.00, color: '#D40000' },
  { name: 'Calm', category: 'health', defaultPrice: 14.99, color: '#4A90D9' },
  { name: 'Noom (Weight)', category: 'health', defaultPrice: 17.42, color: '#00C48C' },
  { name: 'MyFitnessPal Premium', category: 'health', defaultPrice: 19.99, color: '#0070E0' },

  // === PASSWORD MANAGERS & SECURITY ===
  { name: '1Password (Individual)', category: 'vpn', defaultPrice: 2.99, color: '#0094FF' },
  { name: '1Password (Family)', category: 'vpn', defaultPrice: 4.99, color: '#0094FF' },
  { name: 'Dashlane Premium', category: 'vpn', defaultPrice: 3.75, color: '#0E353D' },
  { name: 'Bitwarden Premium', category: 'vpn', defaultPrice: 0.83, color: '#175DDC' },
  { name: 'Surfshark VPN', category: 'vpn', defaultPrice: 1.99, color: '#178BF1' },
  { name: 'CyberGhost VPN', category: 'vpn', defaultPrice: 2.19, color: '#FDCB58' },

  // === GAMING (additional) ===
  { name: 'EA Play', category: 'gaming', defaultPrice: 5.99, color: '#000000' },
  { name: 'Ubisoft+ (Standard)', category: 'gaming', defaultPrice: 7.99, color: '#000000' },
  { name: 'Ubisoft+ (Premium)', category: 'gaming', defaultPrice: 17.99, color: '#000000' },
  { name: 'Apple Arcade', category: 'gaming', defaultPrice: 6.99, color: '#000000' },
  { name: 'GeForce NOW (Performance)', category: 'gaming', defaultPrice: 9.99, color: '#76B900' },
  { name: 'GeForce NOW (Ultimate)', category: 'gaming', defaultPrice: 19.99, color: '#76B900' },

  // === DEV TOOLS ===
  { name: 'GitHub Pro', category: 'productivity', defaultPrice: 4.00, color: '#24292E' },
  { name: 'GitHub Team', category: 'productivity', defaultPrice: 4.00, color: '#24292E' },
  { name: 'GitHub Copilot Individual', category: 'ai', defaultPrice: 10.00, color: '#24292E' },
  { name: 'GitHub Copilot Business', category: 'ai', defaultPrice: 19.00, color: '#24292E' },
  { name: 'Vercel Pro', category: 'productivity', defaultPrice: 20.00, color: '#000000' },
  { name: 'Figma Professional', category: 'productivity', defaultPrice: 16.00, color: '#F24E1E' },
  { name: 'Figma Organization', category: 'productivity', defaultPrice: 45.00, color: '#F24E1E' },
  { name: 'Railway Pro', category: 'productivity', defaultPrice: 5.00, color: '#0B0D0E' },
  { name: 'Netlify Pro', category: 'productivity', defaultPrice: 19.00, color: '#00C7B7' },

  // === WEBSITE/ECOMMERCE ===
  { name: 'Shopify Starter', category: 'productivity', defaultPrice: 5.00, color: '#96BF48' },
  { name: 'Shopify Basic', category: 'productivity', defaultPrice: 29.00, color: '#96BF48' },
  { name: 'Shopify Standard', category: 'productivity', defaultPrice: 79.00, color: '#96BF48' },
  { name: 'Squarespace Personal', category: 'productivity', defaultPrice: 16.00, color: '#000000' },
  { name: 'Squarespace Business', category: 'productivity', defaultPrice: 33.00, color: '#000000' },
  { name: 'Wix Light', category: 'productivity', defaultPrice: 17.00, color: '#0C6EFC' },
  { name: 'Wix Core', category: 'productivity', defaultPrice: 29.00, color: '#0C6EFC' },

  // === EDUCATION ===
  { name: 'MasterClass (Individual)', category: 'streaming', defaultPrice: 10.00, color: '#000000' },
  { name: 'MasterClass (Duo)', category: 'streaming', defaultPrice: 15.00, color: '#000000' },
  { name: 'MasterClass (Family)', category: 'streaming', defaultPrice: 20.00, color: '#000000' },
  { name: 'Coursera Plus', category: 'streaming', defaultPrice: 49.00, color: '#0056D2' },
  { name: 'Skillshare', category: 'streaming', defaultPrice: 13.99, color: '#00FF84' },
  { name: 'Brilliant', category: 'streaming', defaultPrice: 24.99, color: '#000000' },
  { name: 'Duolingo Super', category: 'streaming', defaultPrice: 12.99, color: '#58CC02' },

  // === READING ===
  { name: 'Scribd', category: 'streaming', defaultPrice: 12.99, color: '#1E7B85' },
  { name: 'Medium', category: 'streaming', defaultPrice: 5.00, color: '#000000' },
  { name: 'Blinkist', category: 'streaming', defaultPrice: 12.49, color: '#1CB06B' },

  // === SMART HOME ===
  { name: 'Ring Protect Basic', category: 'other', defaultPrice: 3.99, color: '#1C9AD6' },
  { name: 'Ring Protect Plus', category: 'other', defaultPrice: 10.00, color: '#1C9AD6' },
  { name: 'Ring Protect Pro', category: 'other', defaultPrice: 20.00, color: '#1C9AD6' },
  { name: 'Nest Aware', category: 'other', defaultPrice: 8.00, color: '#4285F4' },
  { name: 'Nest Aware Plus', category: 'other', defaultPrice: 15.00, color: '#4285F4' },

  // === MEMBERSHIPS ===
  { name: 'Costco Gold Star', category: 'other', defaultPrice: 5.42, color: '#E31837' },
  { name: 'Costco Executive', category: 'other', defaultPrice: 10.83, color: '#E31837' },
  { name: 'Sam\'s Club', category: 'other', defaultPrice: 4.17, color: '#0060A9' },
  { name: 'Sam\'s Club Plus', category: 'other', defaultPrice: 9.17, color: '#0060A9' },
  { name: 'AAA Basic', category: 'other', defaultPrice: 5.08, color: '#003087' },

  // === RADIO/PODCAST ===
  { name: 'SiriusXM Music Showcase', category: 'music', defaultPrice: 10.99, color: '#0000EB' },
  { name: 'SiriusXM All Access (Streaming)', category: 'music', defaultPrice: 12.99, color: '#0000EB' },
  { name: 'SiriusXM Platinum (Car + Streaming)', category: 'music', defaultPrice: 23.99, color: '#0000EB' },
];
