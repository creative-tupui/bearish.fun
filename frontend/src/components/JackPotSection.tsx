import { jackpotDemoUsers } from "../constants/demoInfo";
import { JackpotUser } from "../types";

const JackPotSection = () => {

  return (
    <div className="bg-card-primary rounded-lg p-4 flex flex-col gap-4">
      <div className="bg-card-secondary rounded-lg p-4 flex items-center gap-4">
        <div className="w-9 h-10 shrink-0">
          <img src="/src/assets/images/fire.png" alt="fire" className="" />
        </div>
        <div className="w-full flex flex-col gap-1 justify-start text-left font-oxanium">
          <p className="text-gray-secondary text-base">Current steak</p>
          <p className="text-gray-secondary text-base">Best</p>
        </div>
        <div className="flex flex-col gap-1 justify-end text-right font-oxanium">
          <p className="text-gray-primary text-base">0</p>
          <p className="text-gray-primary text-base">10</p>
        </div>
      </div>
      {(jackpotDemoUsers as JackpotUser[]).map((user, index) => (
        <div key={index} className="bg-card-secondary rounded-lg p-4 flex justify-between items-center gap-2.5">
          <div className="flex items-center gap-2.5 text-base font-oxanium">
            <p className="text-gray-secondary">x{user.id}</p>
            {user.reward > 0 && <p className="text-positive-light">+${user.reward}</p>}
          </div>
          <div className="flex justify-end items-center">
            {user.investors.map((investor, index) => (
              <img
                key={index}
                src={investor.avatar}
                alt={`Investor ${index + 1}`}
                className={`w-8 h-8 rounded-full border border-black ${index === 0 ? "ml-0" : user.investors.length < 13 ? "-ml-4" : user.investors.length < 19 ? "-ml-5" : "-ml-6"}`}
              />
            ))}
            {user.investors.length === 0 && <p className="text-gray-secondary">No winners</p>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default JackPotSection