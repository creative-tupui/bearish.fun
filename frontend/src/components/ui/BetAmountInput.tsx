import { useState } from "react";

interface BetAmountInputProps {
  selectedBetAmount: number;
  setBetAmount: (amount: number) => void;
}

const BetAmountInput: React.FC<BetAmountInputProps> = ({ selectedBetAmount, setBetAmount }) => {
  const [betAmount, inputBetAmount] = useState<number>();
  return (
    <div className={`w-[60px] h-9 p-2 flex items-center border rounded-lg ${betAmount === selectedBetAmount ? 'border-accent' : 'border-gray-tertiary'}`}>
      <span className="mr-1">$</span>
      <input
        type="number"
        className="w-8 border-none focus:outline-none"
        value={betAmount}
        onChange={(e) => inputBetAmount(Number(e.target.value))}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (betAmount) {
              setBetAmount(betAmount);
            }
          }
        }}
      />
    </div>
  )
}

export default BetAmountInput
