
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { WeightOption } from '@/lib/data';

interface WeightSelectorProps {
  weightOptions: WeightOption[];
  selectedWeight: string;
  onWeightChange: (weight: string) => void;
}

const WeightSelector = ({ weightOptions, selectedWeight, onWeightChange }: WeightSelectorProps) => {
  const [showWeightOptions, setShowWeightOptions] = useState(false);
  const selectedOption = weightOptions.find(opt => opt.value === selectedWeight) || weightOptions[0];

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-muted-foreground mb-2">
        Choose Weight/Size:
      </label>
      <div className="relative">
        <button
          className="w-full flex items-center justify-between border rounded-md px-4 py-2.5 bg-background hover:bg-muted transition-colors"
          onClick={() => setShowWeightOptions(!showWeightOptions)}
        >
          <span>{selectedOption.label}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
        
        {showWeightOptions && (
          <div className="absolute z-10 mt-1 w-full bg-background border rounded-md shadow-lg">
            {weightOptions.map((option) => (
              <button
                key={option.value}
                className="w-full text-left px-4 py-2.5 hover:bg-muted"
                onClick={() => {
                  onWeightChange(option.value);
                  setShowWeightOptions(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeightSelector;
