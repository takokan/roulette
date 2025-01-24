import React from 'react';

interface RouletteWheelProps {
  isSpinning: boolean;
  onSpin: () => void;
  currentNumber: number | null;
}

const RouletteWheel: React.FC<RouletteWheelProps> = ({ currentNumber }) => {
  return (
    <div className="relative w-96 h-96 mx-auto mb-8">
      <div className="relative w-full h-full rounded-full border-4 border-primary/50 bg-secondary flex items-center justify-center">
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold">
            {currentNumber !== null ? currentNumber : '?'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RouletteWheel;