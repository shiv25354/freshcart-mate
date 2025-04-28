import { LucideIcon } from 'lucide-react';

// Product Types
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
  rating: number;
  discount?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  weightOptions?: WeightOption[];
  selectedWeight?: string;
}

export interface WeightOption {
  label: string;
  value: string;
  priceModifier: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  icon?: LucideIcon;
}

// Order Types
export interface ProgressStep {
  id: number;
  status: string;
  time: string;
  completed: boolean;
  icon: string;
}

export interface DriverInfo {
  name: string;
  vehicle: string;
  image: string;
  phone: string;
}

export interface OrderDetails {
  id: string;
  status: string;
  eta: string;
  distance: string;
  progress: ProgressStep[];
  driver: DriverInfo;
  instructions: string;
  contactless: boolean;
  mapImage: string;
}

// Cart Types
export interface CartItem extends Product {
  quantity: number;
}

// User Types
export interface UserAddress {
  id: string;
  type: 'home' | 'work' | 'other';
  address: string;
  details?: string;
  isDefault?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses: UserAddress[];
} 