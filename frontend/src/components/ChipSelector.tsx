import React from 'react';
import { Button } from './ui/button';

interface ChipSelectorProps {
  onSelectChip: (value: number) => void;
  selectedValue: number;
}

const ChipSelector: React.FC<ChipSelectorProps> = ({ onSelectChip, selectedValue }) => {
  const chipValues = [1, 5, 10, 25, 100];

  return (
    <div className="flex justify-center gap-2 mb-6">
      {chipValues.map((value) => (
        <Button
          key={value}
          onClick={() => onSelectChip(value)}
          className={`rounded-full w-12 h-12 ${
            selectedValue === value
              ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
              : ''
          } ${
            value === 1 ? 'bg-white text-black' :
            value === 5 ? 'bg-red-500' :
            value === 10 ? 'bg-blue-500' :
            value === 25 ? 'bg-green-500' :
            'bg-purple-500'
          }`}
        >
          ${value}
        </Button>
      ))}
    </div>
  );
};

export default ChipSelector;