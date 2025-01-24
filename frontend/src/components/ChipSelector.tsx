import React from 'react';
import { Button } from './ui/button';
import { COINS } from '../../../backend/src/Types';

interface ChipSelectorProps {
  onSelectChip: (value: COINS) => void;
  selectedValue: COINS;
}

const ChipSelector: React.FC<ChipSelectorProps> = ({ onSelectChip, selectedValue }) => {
  const chipValues = Object.values(COINS).filter(value => typeof value === 'number');

  return (
    <div className="flex justify-center gap-2 mb-6">
      {chipValues.map((value) => (
        <Button
          key={value}
          onClick={() => onSelectChip(value as COINS)}
          className={`rounded-full w-12 h-12 ${
            selectedValue === value
              ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
              : ''
          } ${
            value === COINS.One ? 'bg-white text-black' :
            value === COINS.Five ? 'bg-red-500' :
            value === COINS.Ten ? 'bg-blue-500' :
            value === COINS.TwentyFive ? 'bg-green-500' :
            value === COINS.Fifty ? 'bg-fuchsia-400':
            value === COINS.OneHundred ? 'bg-yellow-400':
            value === COINS.TwoHundredFifty ? 'bg-teal-400':
            value === COINS.FiveHundred ? 'bg-violet-500':   
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