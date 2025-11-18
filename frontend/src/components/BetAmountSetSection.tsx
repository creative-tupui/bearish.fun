import { useState } from "react";
import BetAmountButton from "./ui/BetAmountButton";
import BetAmountInput from "./ui/BetAmountInput";

// Define the props type
interface BetAmountSetSectionProps {
  setSelectedBetAmount: (amount: number) => void;
}

const BetAmountSetSection: React.FC<BetAmountSetSectionProps> = ({
  setSelectedBetAmount,
}) => {
  const [selectedBetAmount, setLocalBetAmount] = useState<number>(5);
  const betAmounts = [1, 5, 10, 25, 50, 100];

  const handleBetAmountChange = (amount: number) => {
    setLocalBetAmount(amount);
    setSelectedBetAmount(amount);
  };

  return (
    <div className="bg-card-secondary rounded-lg p-2 flex gap-2">
      {betAmounts.map((amount) => (
        <BetAmountButton
          key={amount}
          betAmount={amount}
          selectedBetAmount={selectedBetAmount}
          setBetAmount={handleBetAmountChange}
        />
      ))}
      <BetAmountInput
        selectedBetAmount={selectedBetAmount}
        setBetAmount={handleBetAmountChange}
      />
    </div>
  );
};

export default BetAmountSetSection;
