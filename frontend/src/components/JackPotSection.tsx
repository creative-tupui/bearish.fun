import { usePoolContext } from "../contexts/PoolContext";
import { JackpotUser } from "../types";

const JackPotSection = () => {
  const { jackpotUsers } = usePoolContext();

  return (
    <div className="bg-card-primary rounded-lg p-4 flex gap-4">
      <div className="w-[30px] h-9 shrink-0">
        <img src="/src/assets/images/fire.png" alt="fire" className="" />
      </div>
      <div className="w-full grid grid-cols-6 gap-2">
        {jackpotUsers.map((user: JackpotUser, index: number) => (
          <div key={index} className="bg-card-secondary rounded-lg px-4 py-2">
            <div className="flex items-center justify-between gap-2.5 text-base font-oxanium">
              <p className="text-gray-secondary">x{user.id}</p>
              {user.reward > 0 
                ? <p className="text-positive-light">+${user.reward}</p> 
                : <p className="">0</p>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JackPotSection