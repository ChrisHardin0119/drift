export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  { id: 'streaming', name: 'Streaming', icon: 'play-circle', color: '#E17055' },
  { id: 'music', name: 'Music', icon: 'music', color: '#6C5CE7' },
  { id: 'productivity', name: 'Productivity', icon: 'briefcase', color: '#00CEC9' },
  { id: 'cloud', name: 'Cloud Storage', icon: 'cloud', color: '#0984E3' },
  { id: 'social', name: 'Social', icon: 'users', color: '#E84393' },
  { id: 'gaming', name: 'Gaming', icon: 'crosshair', color: '#00B894' },
  { id: 'finance', name: 'Finance', icon: 'dollar-sign', color: '#FDCB6E' },
  { id: 'health', name: 'Health & Fitness', icon: 'heart', color: '#FF7675' },
  { id: 'news', name: 'News', icon: 'book-open', color: '#74B9FF' },
  { id: 'ai', name: 'AI Tools', icon: 'cpu', color: '#A29BFE' },
  { id: 'vpn', name: 'VPN & Security', icon: 'shield', color: '#55EFC4' },
  { id: 'other', name: 'Other', icon: 'grid', color: '#A0A0B8' },
];

export const getCategoryById = (id: string): Category => {
  return categories.find(c => c.id === id) || categories[categories.length - 1];
};
