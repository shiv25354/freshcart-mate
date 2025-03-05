
import { CreditCard, Receipt, Truck, Wallet } from 'lucide-react';
import { DeliveryOption } from '@/components/checkout/DeliveryOptions';
import { PaymentMethod } from '@/components/checkout/PaymentMethods';

export const deliveryOptions: DeliveryOption[] = [
  {
    id: 'express',
    title: 'Express Delivery',
    price: 50,
    time: '10 minutes',
  },
  {
    id: 'standard',
    title: 'Standard Delivery',
    price: 20,
    time: '30 minutes',
  },
];

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'cash',
    title: 'Cash on Delivery',
    icon: Wallet,
  },
  {
    id: 'upi',
    title: 'UPI',
    icon: CreditCard,
  },
  {
    id: 'wallet',
    title: 'Wallet',
    icon: Receipt,
  },
];
