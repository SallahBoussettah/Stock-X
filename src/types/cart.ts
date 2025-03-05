import { Product } from './product';

export interface CartItem {
  id: string; // Unique ID for this cart item
  productId: string;
  quantity: number;
  selectedOptions: SelectedOption[];
  product: Product; // Denormalized product data for easy access
}

export interface SelectedOption {
  variantId: string;
  optionId: string;
}

export interface Cart {
  id: string;
  userId?: string; // Optional for guest users
  items: CartItem[];
  couponCode?: string;
  couponDiscount?: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDeliveryTime: string;
}

export interface CouponCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minimumOrderValue?: number;
  expiryDate: string;
  isActive: boolean;
} 