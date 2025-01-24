import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Admin = () => {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  const handleNumberSelect = (number: number) => {
    setSelectedNumber(number);
    // Here you would implement WebSocket logic to broadcast the number
    toast.success(`Selected winning number: ${number}`);
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Admin Panel</h1>
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 37 }, (_, i) => (
            <Button
              key={i}
              onClick={() => handleNumberSelect(i)}
              className={`${
                selectedNumber === i ? 'ring-2 ring-primary' : ''
              } ${
                [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(i)
                  ? 'bg-red-600 hover:bg-red-700'
                  : i === 0
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-gray-800 hover:bg-gray-900'
              }`}
            >
              {i}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;