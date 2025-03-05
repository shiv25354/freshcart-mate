
import React from 'react';
import { Check, Timer } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export type DeliveryOption = {
  id: string;
  title: string;
  price: number;
  time: string;
};

interface DeliveryOptionsProps {
  deliveryOptions: DeliveryOption[];
  selectedDelivery: string;
  setSelectedDelivery: (id: string) => void;
}

const DeliveryOptions: React.FC<DeliveryOptionsProps> = ({
  deliveryOptions,
  selectedDelivery,
  setSelectedDelivery,
}) => {
  return (
    <div className="bg-card shadow-sm rounded-xl p-6">
      <h2 className="text-lg font-medium mb-4">Delivery Options</h2>
      <Separator className="mb-4" />
      
      <div className="space-y-3">
        {deliveryOptions.map((option) => (
          <div 
            key={option.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedDelivery === option.id 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => setSelectedDelivery(option.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedDelivery === option.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}>
                  {selectedDelivery === option.id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Timer className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <div className="font-medium">{option.title}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Timer className="h-3 w-3" />
                    <span>Delivery in {option.time}</span>
                  </div>
                </div>
              </div>
              <div className="font-medium">₹{option.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryOptions;
