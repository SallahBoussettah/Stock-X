export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  images: string[];
  category: string;
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviews: Review[];
  variants: ProductVariant[];
  tags: string[];
  specifications: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  options: ProductOption[];
}

export interface ProductOption {
  id: string;
  value: string;
  stockQuantity: number;
  priceModifier: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
}

export interface ProductFilterOptions {
  categories?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest';
  inStock?: boolean;
  searchQuery?: string;
} 