import { useState } from "react";
import UpDownVector from "./ui/UpDownVector";

const  BettingTracker = () => {
  const [bitcoinPrice] = useState<number>(93452.67);
  const [last10BetResult] = useState<Array<'up' | 'down'>>(['up', 'down', 'up', 'down', 'up', 'down', 'up', 'down', 'up', 'down']);
  return (
    <div className="bg-card-primary rounded-lg p-4 flex flex-col gap-4">
      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-2 items-start">
          <h5 className="text-gray-primary text-2xl">Bitcoin</h5>
          <p className="text-gray-primary text-lg">{bitcoinPrice}</p>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <h5 className="text-gray-primary text-2xl">30</h5>
          <p className="text-gray-primary text-lg">Place your bets</p>
        </div>
      </div>
      <div className="w-full h-[376px] bg-card-secondary rounded-2xl"></div>
      <div className="flex justify-between">
        {last10BetResult.map((result, index) => (
          <UpDownVector state={result} key={index} />
        ))}
      </div>
    </div>
  )
}

export default BettingTracker