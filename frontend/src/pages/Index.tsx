import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import RouletteWheel from '../components/RouletteWheel';
import BettingBoard from '../components/BettingBoard';
import ChipSelector from '../components/ChipSelector';

const Index = () => {
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [selectedChipValue, setSelectedChipValue] = useState(1);
  const [balance, setBalance] = useState(1000);

  useEffect(() => {
    // Here you would implement WebSocket connection logic
    // For now, we'll just show a toast that we're connected
    toast.success('Connected to game server');

    return () => {
      // Cleanup WebSocket connection
    };
  }, []);

  const handlePlaceBet = (type: string, value: number | string) => {
    if (selectedChipValue > balance) {
      toast.error("Insufficient balance!");
      return;
    }

    setBalance((prev) => prev - selectedChipValue);
    toast.success(`Bet placed: $${selectedChipValue} on ${type === 'color' ? value : `number ${value}`}`);
  };

  return (
    <div className="min-h-screen p-4 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Roulette</h1>
        <p className="text-xl text-primary">Balance: ${balance}</p>
      </div>

      <RouletteWheel
        isSpinning={false}
        onSpin={() => {}}
        currentNumber={currentNumber}
      />

      <ChipSelector
        onSelectChip={setSelectedChipValue}
        selectedValue={selectedChipValue}
      />

      <BettingBoard
        onPlaceBet={handlePlaceBet}
        selectedChipValue={selectedChipValue}
        isSpinning={false}
      />
    </div>
  );
};

export default Index;