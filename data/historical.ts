export interface HistoricalChange {
  id: string;
  service: string;
  category: string;
  date: string;
  type: 'price_increase' | 'feature_removal' | 'policy_change' | 'free_tier_change' | 'new_feature' | 'acquisition';
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  impact: string;
  oldValue?: string;
  newValue?: string;
}

export const historicalChanges: HistoricalChange[] = [
  {
    id: 'netflix-jan-2025',
    service: 'Netflix',
    category: 'streaming',
    date: '2025-01-15',
    type: 'price_increase',
    severity: 'high',
    title: 'Netflix raises prices across all tiers',
    description: 'Netflix increased its ad-supported plan to $8/mo, Standard plan by $2.50/mo, and Premium plan by $2/mo.',
    impact: 'Up to $30/year more depending on your plan',
    oldValue: 'Standard: $15.49/mo, Premium: $22.99/mo',
    newValue: 'Standard: $17.99/mo, Premium: $24.99/mo',
  },
  {
    id: 'spotify-jan-2026',
    service: 'Spotify',
    category: 'music',
    date: '2026-01-15',
    type: 'price_increase',
    severity: 'high',
    title: 'Spotify raises prices for all Premium plans',
    description: 'Spotify increased Individual to $13/mo, Duo to $19/mo, Family to $22/mo, and Student to $7/mo.',
    impact: '$12-24/year more depending on your plan',
    oldValue: 'Individual: $11.99/mo, Family: $19.99/mo',
    newValue: 'Individual: $13/mo, Family: $22/mo',
  },
  {
    id: 'disney-oct-2025',
    service: 'Disney+',
    category: 'streaming',
    date: '2025-10-01',
    type: 'price_increase',
    severity: 'high',
    title: 'Disney+ raises prices on all plans',
    description: 'Ad-supported plan increased by $2 to $11.99/mo. Premium no-ads plan increased by $3 to $18.99/mo.',
    impact: '$24-36/year more',
    oldValue: 'Ad tier: $9.99/mo, Premium: $15.99/mo',
    newValue: 'Ad tier: $11.99/mo, Premium: $18.99/mo',
  },
  {
    id: 'peacock-jul-2025',
    service: 'Peacock',
    category: 'streaming',
    date: '2025-07-01',
    type: 'price_increase',
    severity: 'high',
    title: 'Peacock raises both tiers by $3/mo',
    description: 'Both Premium ($10.99/mo) and Premium Plus ($16.99/mo) plans increased by $3 per month.',
    impact: '$36/year more on either plan',
    oldValue: 'Premium: $7.99/mo, Plus: $13.99/mo',
    newValue: 'Premium: $10.99/mo, Plus: $16.99/mo',
  },
  {
    id: 'appletv-aug-2025',
    service: 'Apple TV+',
    category: 'streaming',
    date: '2025-08-01',
    type: 'price_increase',
    severity: 'medium',
    title: 'Apple TV+ jumps from $9.99 to $12.99',
    description: 'Apple TV+ increased its monthly subscription by $3, a 30% price hike.',
    impact: '$36/year more',
    oldValue: '$9.99/mo',
    newValue: '$12.99/mo',
  },
  {
    id: 'hbo-oct-2025',
    service: 'Max (HBO)',
    category: 'streaming',
    date: '2025-10-15',
    type: 'price_increase',
    severity: 'medium',
    title: 'Max raises prices $1/mo across all tiers',
    description: 'All Max plans increased by $1 per month or $10 annually.',
    impact: '$12/year more',
    oldValue: 'Ad tier: $9.99/mo',
    newValue: 'Ad tier: $10.99/mo',
  },
  {
    id: 'paramount-jan-2026',
    service: 'Paramount+',
    category: 'streaming',
    date: '2026-01-15',
    type: 'price_increase',
    severity: 'medium',
    title: 'Paramount+ raises both plans by $1',
    description: 'Essential plan went from $7.99 to $8.99/mo and Premium from $12.99 to $13.99/mo.',
    impact: '$12/year more',
    oldValue: 'Essential: $7.99/mo, Premium: $12.99/mo',
    newValue: 'Essential: $8.99/mo, Premium: $13.99/mo',
  },
  {
    id: 'x-privacy-2026',
    service: 'X (Twitter)',
    category: 'social',
    date: '2026-01-15',
    type: 'policy_change',
    severity: 'high',
    title: 'X updates privacy policy — your data trains AI',
    description: 'X updated Terms of Service and Privacy Policy. New terms allow X to use your posts, interactions, and data to train AI models.',
    impact: 'Your content may be used for AI training without explicit opt-in',
  },
  {
    id: 'fakespot-shutdown-2025',
    service: 'Fakespot',
    category: 'other',
    date: '2025-07-01',
    type: 'feature_removal',
    severity: 'high',
    title: 'Fakespot shuts down completely',
    description: 'Fakespot, the popular fake review detection service, discontinued all services permanently after being acquired by Mozilla.',
    impact: 'No more fake review detection — millions of users lost access',
  },
  {
    id: 'hulu-bundle-2025',
    service: 'Hulu',
    category: 'streaming',
    date: '2025-10-01',
    type: 'price_increase',
    severity: 'medium',
    title: 'Hulu bundle prices increase',
    description: 'The Disney+, Hulu, and ESPN Select bundle rose to $20/mo, up from previous pricing.',
    impact: 'Bundle savings shrinking',
    oldValue: 'Bundle: ~$16/mo',
    newValue: 'Bundle: $20/mo',
  },
  {
    id: 'adobe-cancel-2025',
    service: 'Adobe Creative Cloud',
    category: 'productivity',
    date: '2025-03-01',
    type: 'policy_change',
    severity: 'high',
    title: 'Adobe early cancellation fees draw FTC complaint',
    description: 'Adobe faced FTC scrutiny over hidden early termination fees on annual plans billed monthly. Users reported fees up to $150+ for canceling.',
    impact: 'Users locked into subscriptions with steep exit costs',
  },
  {
    id: 'notion-ai-2025',
    service: 'Notion',
    category: 'productivity',
    date: '2025-04-01',
    type: 'price_increase',
    severity: 'medium',
    title: 'Notion AI becomes mandatory add-on charge',
    description: 'Notion started bundling AI features into plans at higher price points, with the free tier becoming more limited.',
    impact: 'Free users get fewer features, paid plans cost more',
  },
  {
    id: 'youtube-premium-2025',
    service: 'YouTube Premium',
    category: 'streaming',
    date: '2025-01-01',
    type: 'price_increase',
    severity: 'medium',
    title: 'YouTube Premium family plan increases',
    description: 'YouTube Premium family plan price continued its upward trend, reaching $34.99/mo in several markets.',
    impact: 'Up to $60/year more for family plan subscribers',
    oldValue: 'Family: $22.99/mo',
    newValue: 'Family: $34.99/mo',
  },
  {
    id: 'chatgpt-pro-2025',
    service: 'ChatGPT',
    category: 'ai',
    date: '2025-12-01',
    type: 'price_increase',
    severity: 'medium',
    title: 'ChatGPT Pro launches at $200/mo',
    description: 'OpenAI introduced ChatGPT Pro tier at $200/month with unlimited access to advanced models, while Plus remained $20/mo with increasing usage caps.',
    impact: 'Power users face steep pricing for unrestricted access',
  },
];

export const getTotalYearlyImpact = (): number => {
  return historicalChanges
    .filter(c => c.type === 'price_increase')
    .reduce((sum, c) => {
      const match = c.impact.match(/\$(\d+)/);
      return sum + (match ? parseInt(match[1]) : 0);
    }, 0);
};
