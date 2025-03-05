
import React from 'react';
import { Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export type PaymentMethod = {
  id: string;
  title: string;
  icon: React.ElementType;
};

interface PaymentMethodsProps {
  paymentMethods: PaymentMethod[];
  selectedPayment: string;
  setSelectedPayment: (id: string) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  paymentMethods,
  selectedPayment,
  setSelectedPayment,
}) => {
  return (
    <div className="bg-card shadow-sm rounded-xl p-6">
      <h2 className="text-lg font-medium mb-4">Payment Method</h2>
      <Separator className="mb-4" />
      
      <div className="space-y-3">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <div 
              key={method.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedPayment === method.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => setSelectedPayment(method.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedPayment === method.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}>
                  {selectedPayment === method.id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                <div className="font-medium">{method.title}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethods;
