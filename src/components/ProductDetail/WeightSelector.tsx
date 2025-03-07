
import { useState } from 'react';
import { WeightOption } from '@/lib/types';
import { cn } from '@/lib/utils';

interface WeightSelectorProps {
  weightOptions: WeightOption[];
  selectedWeight: string;
  onWeightChange: (weight: string) => void;
}

const WeightSelector = ({ weightOptions, selectedWeight, onWeightChange }: WeightSelectorProps) => {
  const selectedOption = weightOptions.find(opt => opt.value === selectedWeight) || weightOptions[0];

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-muted-foreground mb-2">
        Choose Weight/Size:
      </label>
      <div className="flex flex-wrap gap-2">
        {weightOptions.map((option) => (
          <button
            key={option.value}
            className={cn(
              "flex items-center justify-center h-14 w-14 rounded-full border transition-colors",
              "text-sm font-medium hover:border-primary",
              selectedWeight === option.value 
                ? "bg-primary text-primary-foreground border-primary" 
                : "bg-background border-input"
            )}
            onClick={() => onWeightChange(option.value)}
            aria-selected={selectedWeight === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeightSelector;
