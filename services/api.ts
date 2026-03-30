// Drift API Client — connects the app to the backend server
// Fetches live service data, price changes, policy updates, etc.

const API_BASE = __DEV__
  ? 'http://10.0.2.2:3000/api'  // Android emulator -> localhost
  : 'https://drift-backend-production-a0a3.up.railway.app/api'; // Production URL (update after deploy)

interface APIService {
  id: number;
  slug: string;
  name: string;
  category: string;
  current_price: number;
  billing_cycle: string;
  color: string;
  updated_at: string;
}

interface APIChange {
  id: number;
  service_id: number;
  type: string;
  severity: string;
  title: string;
  description: string;
  impact: string | null;
  old_value: string | null;
  new_value: string | null;
  source_url: string | null;
  detected_at: string;
  service_name: string;
  category: string;
  color: string;
  service_slug: string;
}

interface APIStats {
  priceHikes30d: number;
  policyChanges30d: number;
  totalServices: number;
}

class DriftAPI {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE;
  }

  private async fetch<T>(endpoint: string): Promise<T> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      const response = await globalThis.fetch(`${this.baseUrl}${endpoint}`, {
        headers: { 'Accept': 'application/json' },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      return response.json();
    } catch (err: any) {
      console.warn(`Drift API error (${endpoint}):`, err.message);
      throw err;
    }
  }

  // Get all trackable services (the catalog)
  async getServices(category?: string): Promise<APIService[]> {
    const params = category ? `?category=${category}` : '';
    return this.fetch<APIService[]>(`/services${params}`);
  }

  // Get a single service with price history
  async getService(slug: string): Promise<APIService & { priceHistory: any[]; changes: any[] }> {
    return this.fetch(`/services/${slug}`);
  }

  // Get the changes feed (main feed for dashboard + digest)
  async getChanges(options?: { type?: string; severity?: string; limit?: number }): Promise<APIChange[]> {
    const params = new URLSearchParams();
    if (options?.type) params.set('type', options.type);
    if (options?.severity) params.set('severity', options.severity);
    if (options?.limit) params.set('limit', options.limit.toString());
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.fetch<APIChange[]>(`/changes${query}`);
  }

  // Get last 7 days of changes (for dashboard widget)
  async getRecentChanges(): Promise<APIChange[]> {
    return this.fetch<APIChange[]>('/changes/recent');
  }

  // Get dashboard stats
  async getStats(): Promise<APIStats> {
    return this.fetch<APIStats>('/stats');
  }

  // Get categories with counts
  async getCategories(): Promise<{ category: string; service_count: number }[]> {
    return this.fetch('/categories');
  }

  // Health check
  async checkHealth(): Promise<{ status: string }> {
    return this.fetch('/health');
  }

  // Update the base URL (e.g., after Railway deploy)
  setBaseUrl(url: string) {
    this.baseUrl = url;
  }
}

// Export a singleton instance
export const driftAPI = new DriftAPI();
export type { APIService, APIChange, APIStats };
