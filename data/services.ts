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
  { name: 'Netflix', category: 'streaming', defaultPrice: 17.99, color: '#E50914' },
  { name: 'Spotify', category: 'music', defaultPrice: 13.00, color: '#1DB954' },
  { name: 'Disney+', category: 'streaming', defaultPrice: 11.99, color: '#113CCF' },
  { name: 'Hulu', category: 'streaming', defaultPrice: 9.99, color: '#1CE783' },
  { name: 'Max (HBO)', category: 'streaming', defaultPrice: 10.99, color: '#002BE7' },
  { name: 'Apple TV+', category: 'streaming', defaultPrice: 12.99, color: '#000000' },
  { name: 'Amazon Prime', category: 'streaming', defaultPrice: 14.99, color: '#00A8E1' },
  { name: 'YouTube Premium', category: 'streaming', defaultPrice: 13.99, color: '#FF0000' },
  { name: 'Peacock', category: 'streaming', defaultPrice: 10.99, color: '#000000' },
  { name: 'Paramount+', category: 'streaming', defaultPrice: 8.99, color: '#0064FF' },
  { name: 'Apple Music', category: 'music', defaultPrice: 10.99, color: '#FA243C' },
  { name: 'YouTube Music', category: 'music', defaultPrice: 10.99, color: '#FF0000' },
  { name: 'Tidal', category: 'music', defaultPrice: 10.99, color: '#000000' },
  { name: 'Adobe Creative Cloud', category: 'productivity', defaultPrice: 59.99, color: '#FF0000' },
  { name: 'Microsoft 365', category: 'productivity', defaultPrice: 9.99, color: '#0078D4' },
  { name: 'Notion', category: 'productivity', defaultPrice: 10.00, color: '#000000' },
  { name: 'ChatGPT Plus', category: 'ai', defaultPrice: 20.00, color: '#10A37F' },
  { name: 'Claude Pro', category: 'ai', defaultPrice: 20.00, color: '#D4A574' },
  { name: 'iCloud+', category: 'cloud', defaultPrice: 2.99, color: '#3693F3' },
  { name: 'Google One', category: 'cloud', defaultPrice: 2.99, color: '#4285F4' },
  { name: 'Dropbox', category: 'cloud', defaultPrice: 11.99, color: '#0061FF' },
  { name: 'Xbox Game Pass', category: 'gaming', defaultPrice: 17.99, color: '#107C10' },
  { name: 'PlayStation Plus', category: 'gaming', defaultPrice: 13.99, color: '#003791' },
  { name: 'Nintendo Switch Online', category: 'gaming', defaultPrice: 3.99, color: '#E60012' },
  { name: 'NordVPN', category: 'vpn', defaultPrice: 12.99, color: '#4687FF' },
  { name: 'ExpressVPN', category: 'vpn', defaultPrice: 12.95, color: '#DA3940' },
  { name: 'X Premium', category: 'social', defaultPrice: 8.00, color: '#000000' },
  { name: 'LinkedIn Premium', category: 'social', defaultPrice: 29.99, color: '#0A66C2' },
  { name: 'Headspace', category: 'health', defaultPrice: 12.99, color: '#F47D31' },
  { name: 'Strava', category: 'health', defaultPrice: 11.99, color: '#FC4C02' },
];
