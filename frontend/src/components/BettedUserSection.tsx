// frontend/src/components/BettedUserSection.tsx
import BettedUsersComponent from "./BettedUsersComponent";
import { usePoolContext } from "../contexts/PoolContext";

const BettedUserSection = () => {
  const { upPool, downPool, upPoolInvestors, downPoolInvestors } = usePoolContext();

  return (
    <div className="flex gap-2">
      <BettedUsersComponent betType="up" pool={upPool} potential={180} investors={upPoolInvestors} />
      <BettedUsersComponent betType="down" pool={downPool} potential={150} investors={downPoolInvestors} />
    </div>
  );
};

export default BettedUserSection;