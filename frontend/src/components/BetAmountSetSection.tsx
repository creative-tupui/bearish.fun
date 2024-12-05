import { useState } from "react";
import BetAmountButton from "./ui/BetAmountButton";
import BetAmountInput from "./ui/BetAmountInput";

const BetAmountSetSection = () => {
  const [selectedBetAmount, setSelectedBetAmount] = useState<number>(5);
  const betAmounts = [1, 5, 10, 25, 50, 100];

  return (
    <div className="bg-card-secondary rounded-lg p-2 flex gap-2">
      {betAmounts.map((amount) => (
        <BetAmountButton key={amount} betAmount={amount} selectedBetAmount={selectedBetAmount} setBetAmount={setSelectedBetAmount} />
      ))}
      <BetAmountInput selectedBetAmount={selectedBetAmount} setBetAmount={setSelectedBetAmount} />
    </div>
  )
}

export default BetAmountSetSection