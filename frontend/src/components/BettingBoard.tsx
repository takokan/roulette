import React from 'react';
import { Button } from './ui/button';

interface Bet {
  type: string;
  value: number | string;
  amount: number;
}

interface BettingBoardProps {
  onPlaceBet: (type: string, value: number | string) => void;
  selectedChipValue: number;
  isSpinning: boolean;
}

const BettingBoard: React.FC<BettingBoardProps> = ({ onPlaceBet, selectedChipValue, isSpinning }) => {
  const numbers = Array.from({ length: 37 }, (_, i) => i);
  const [bets, setBets] = React.useState<Bet[]>([]);
  
  const handlePlaceBet = (type: string, value: number | string) => {
    onPlaceBet(type, value);
    setBets(prev => [...prev, { type, value, amount: selectedChipValue }]);
  };

  const getTotalBetForPosition = (type: string, value: number | string) => {
    return bets
      .filter(bet => bet.type === type && bet.value === value)
      .reduce((total, bet) => total + bet.amount, 0);
  };

  const BetAmount = ({ amount }: { amount: number }) => (
    <div className="absolute -top-2 -right-2 bg-yellow-500 px-2 py-1 rounded-md text-black text-xs font-bold">
      ${amount}
    </div>
  );
  
  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Button
            onClick={() => handlePlaceBet('color', 'red')}
            disabled={isSpinning}
            className="bg-red-600 hover:bg-red-700 text-white w-full"
          >
            Red
          </Button>
          {getTotalBetForPosition('color', 'red') > 0 && (
            <BetAmount amount={getTotalBetForPosition('color', 'red')} />
          )}
        </div>
        
        <div className="relative">
          <Button
            onClick={() => handlePlaceBet('number', 0)}
            disabled={isSpinning}
            className="bg-green-600 hover:bg-green-700 w-full"
          >
            0
          </Button>
          {getTotalBetForPosition('number', 0) > 0 && (
            <BetAmount amount={getTotalBetForPosition('number', 0)} />
          )}
        </div>
        
        <div className="relative">
          <Button
            onClick={() => handlePlaceBet('color', 'black')}
            disabled={isSpinning}
            className="bg-gray-800 hover:bg-gray-900 w-full"
          >
            Black
          </Button>
          {getTotalBetForPosition('color', 'black') > 0 && (
            <BetAmount amount={getTotalBetForPosition('color', 'black')} />
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-6 gap-2">
        {numbers.slice(1).map((number) => (
          <div key={number} className="relative">
            <Button
              onClick={() => handlePlaceBet('number', number)}
              disabled={isSpinning}
              className={`w-full ${
                [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(number)
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-gray-800 hover:bg-gray-900'
              }`}
            >
              {number}
            </Button>
            {getTotalBetForPosition('number', number) > 0 && (
              <BetAmount amount={getTotalBetForPosition('number', number)} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BettingBoard;