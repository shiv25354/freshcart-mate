
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
}
