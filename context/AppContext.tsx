import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TrackedService, ServiceChange } from '../data/services';
import { BETA_CODE } from '../constants/theme';

interface AppState {
  services: TrackedService[];
  isBetaUser: boolean;
  digestHistory: DigestEntry[];
  onboardingComplete: boolean;
}

export interface DigestEntry {
  id: string;
  weekOf: string;
  changes: { serviceId: string; serviceName: string; change: ServiceChange }[];
  totalImpact: string;
}

interface AppContextType extends AppState {
  addService: (service: Omit<TrackedService, 'id' | 'dateAdded' | 'priceHistory' | 'changes'>) => void;
  removeService: (id: string) => void;
  updateServicePrice: (id: string, newPrice: number, reason?: string) => void;
  reportChange: (serviceId: string, change: Omit<ServiceChange, 'id'>) => void;
  activateBeta: (code: string) => boolean;
  completeOnboarding: () => void;
  getTotalMonthlySpend: () => number;
  getRecentChanges: () => { serviceName: string; change: ServiceChange }[];
  getServiceById: (id: string) => TrackedService | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'drift_app_state';

const generateId = () => Math.random().toString(36).substring(2, 15) + Date.now().toString(36);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    services: [],
    isBetaUser: false,
    digestHistory: [],
    onboardingComplete: false,
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadState();
  }, []);

  useEffect(() => {
    if (loaded) {
      saveState();
    }
  }, [state, loaded]);

  const loadState = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setState(parsed);
      }
    } catch (e) {
      console.error('Failed to load state:', e);
    }
    setLoaded(true);
  };

  const saveState = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  };

  const addService = (service: Omit<TrackedService, 'id' | 'dateAdded' | 'priceHistory' | 'changes'>) => {
    const now = new Date().toISOString().split('T')[0];
    const newService: TrackedService = {
      ...service,
      id: generateId(),
      dateAdded: now,
      priceHistory: [{ date: now, price: service.price }],
      changes: [],
    };
    setState(prev => ({ ...prev, services: [...prev.services, newService] }));
  };

  const removeService = (id: string) => {
    setState(prev => ({ ...prev, services: prev.services.filter(s => s.id !== id) }));
  };

  const updateServicePrice = (id: string, newPrice: number, reason?: string) => {
    const now = new Date().toISOString().split('T')[0];
    setState(prev => ({
      ...prev,
      services: prev.services.map(s => {
        if (s.id !== id) return s;
        const oldPrice = s.price;
        const changeType = newPrice > oldPrice ? 'price_increase' : 'price_decrease';
        const newChange: ServiceChange = {
          id: generateId(),
          date: now,
          type: changeType,
          severity: Math.abs(newPrice - oldPrice) > 3 ? 'high' : Math.abs(newPrice - oldPrice) > 1 ? 'medium' : 'low',
          title: `Price ${changeType === 'price_increase' ? 'increased' : 'decreased'} ${reason ? '— ' + reason : ''}`,
          description: `${s.name} changed from $${oldPrice.toFixed(2)}/mo to $${newPrice.toFixed(2)}/mo`,
          oldValue: `$${oldPrice.toFixed(2)}/mo`,
          newValue: `$${newPrice.toFixed(2)}/mo`,
        };
        return {
          ...s,
          price: newPrice,
          priceHistory: [...s.priceHistory, { date: now, price: newPrice }],
          changes: [...s.changes, newChange],
        };
      }),
    }));
  };

  const reportChange = (serviceId: string, change: Omit<ServiceChange, 'id'>) => {
    setState(prev => ({
      ...prev,
      services: prev.services.map(s => {
        if (s.id !== serviceId) return s;
        return { ...s, changes: [...s.changes, { ...change, id: generateId() }] };
      }),
    }));
  };

  const activateBeta = (code: string): boolean => {
    if (code.toUpperCase().trim() === BETA_CODE) {
      setState(prev => ({ ...prev, isBetaUser: true }));
      return true;
    }
    return false;
  };

  const completeOnboarding = () => {
    setState(prev => ({ ...prev, onboardingComplete: true }));
  };

  const getTotalMonthlySpend = (): number => {
    return state.services.reduce((sum, s) => {
      if (s.billingCycle === 'yearly') return sum + s.price / 12;
      if (s.billingCycle === 'weekly') return sum + s.price * 4.33;
      return sum + s.price;
    }, 0);
  };

  const getRecentChanges = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const changes: { serviceName: string; change: ServiceChange }[] = [];
    state.services.forEach(s => {
      s.changes.forEach(c => {
        if (new Date(c.date) >= thirtyDaysAgo) {
          changes.push({ serviceName: s.name, change: c });
        }
      });
    });
    return changes.sort((a, b) => new Date(b.change.date).getTime() - new Date(a.change.date).getTime());
  };

  const getServiceById = (id: string) => state.services.find(s => s.id === id);

  return (
    <AppContext.Provider
      value={{
        ...state,
        addService,
        removeService,
        updateServicePrice,
        reportChange,
        activateBeta,
        completeOnboarding,
        getTotalMonthlySpend,
        getRecentChanges,
        getServiceById,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
