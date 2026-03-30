import { Platform } from 'react-native';
import {
  initConnection,
  endConnection,
  getSubscriptions,
  requestSubscription,
  purchaseUpdatedListener,
  purchaseErrorListener,
  finishTransaction,
  PurchaseError,
  SubscriptionPurchase,
  Subscription,
  getAvailablePurchases,
} from 'react-native-iap';

// Google Play product IDs — these must match what you create in Play Console
export const SUBSCRIPTION_SKUS = {
  PRO_MONTHLY: 'drift_pro_monthly',      // $3/month
  PRO_YEARLY: 'drift_pro_yearly',         // $15/year
};

const ALL_SUBS = [
  SUBSCRIPTION_SKUS.PRO_MONTHLY,
  SUBSCRIPTION_SKUS.PRO_YEARLY,
];

export type PlanType = 'free' | 'pro_monthly' | 'pro_yearly';

export interface SubscriptionState {
  isProUser: boolean;
  currentPlan: PlanType;
  subscriptions: Subscription[];
  isLoading: boolean;
  error: string | null;
}

export const initialSubscriptionState: SubscriptionState = {
  isProUser: false,
  currentPlan: 'free',
  subscriptions: [],
  isLoading: false,
  error: null,
};

let purchaseUpdateSubscription: any = null;
let purchaseErrorSubscription: any = null;

export async function initIAP(): Promise<Subscription[]> {
  try {
    const result = await initConnection();
    console.log('IAP connection result:', result);

    // Fetch available subscriptions from the store
    const subs = await getSubscriptions({ skus: ALL_SUBS });
    console.log('Available subscriptions:', subs);
    return subs;
  } catch (err) {
    console.warn('IAP init error:', err);
    return [];
  }
}

export function setupPurchaseListeners(
  onPurchaseSuccess: (purchase: SubscriptionPurchase) => void,
  onPurchaseError: (error: PurchaseError) => void
) {
  purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase) => {
    console.log('Purchase updated:', purchase);
    const receipt = purchase.transactionReceipt;
    if (receipt) {
      try {
        await finishTransaction({ purchase, isConsumable: false });
        console.log('Transaction finished successfully');
        onPurchaseSuccess(purchase as SubscriptionPurchase);
      } catch (err) {
        console.warn('Error finishing transaction:', err);
      }
    }
  });

  purchaseErrorSubscription = purchaseErrorListener((error) => {
    console.warn('Purchase error:', error);
    onPurchaseError(error);
  });
}

export function removePurchaseListeners() {
  if (purchaseUpdateSubscription) {
    purchaseUpdateSubscription.remove();
    purchaseUpdateSubscription = null;
  }
  if (purchaseErrorSubscription) {
    purchaseErrorSubscription.remove();
    purchaseErrorSubscription = null;
  }
}

export async function buySubscription(sku: string): Promise<void> {
  try {
    await requestSubscription({ sku });
  } catch (err) {
    console.warn('Buy subscription error:', err);
    throw err;
  }
}

export async function restorePurchases(): Promise<PlanType[]> {
  try {
    const purchases = await getAvailablePurchases();
    const activePlans: PlanType[] = [];

    for (const purchase of purchases) {
      if (purchase.productId === SUBSCRIPTION_SKUS.PRO_MONTHLY) {
        activePlans.push('pro_monthly');
      } else if (purchase.productId === SUBSCRIPTION_SKUS.PRO_YEARLY) {
        activePlans.push('pro_yearly');
      }
    }

    return activePlans;
  } catch (err) {
    console.warn('Restore purchases error:', err);
    return [];
  }
}

export async function disconnectIAP() {
  removePurchaseListeners();
  try {
    await endConnection();
  } catch (err) {
    console.warn('IAP disconnect error:', err);
  }
}

export function isIAPAvailable(): boolean {
  return Platform.OS === 'android' || Platform.OS === 'ios';
}

export function getDisplayPrice(sub: Subscription): string {
  if (Platform.OS === 'android' && sub.subscriptionOfferDetails) {
    const offer = sub.subscriptionOfferDetails[0];
    if (offer?.pricingPhases?.pricingPhaseList?.[0]) {
      return offer.pricingPhases.pricingPhaseList[0].formattedPrice;
    }
  }
  return sub.localizedPrice || '';
}
