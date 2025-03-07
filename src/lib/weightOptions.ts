
import { WeightOption } from './types';

// Standard weight options for all products
export const standardWeightOptions: WeightOption[] = [
  { label: 'Regular Size', value: 'default', priceModifier: 0 },
  { label: '500g', value: 'small', priceModifier: -0.25 },
  { label: '1kg', value: 'medium', priceModifier: 0.5 },
  { label: '2kg', value: 'large', priceModifier: 1.5 },
];
