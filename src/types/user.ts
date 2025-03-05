export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  type: 'billing' | 'shipping';
  isDefault: boolean;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'paypal' | 'other';
  isDefault: boolean;
  lastFourDigits?: string;
  cardType?: string;
  expiryDate?: string;
  holderName?: string;
  // We don't store actual payment details for security reasons
}

export interface UserPreferences {
  marketingEmails: boolean;
  orderUpdates: boolean;
  language: string;
  currency: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
} 