import { usePoolContext } from "../contexts/PoolContext";

const TopUserList = () => {
  const { demoUsers } = usePoolContext();

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="w-full bg-card-primary rounded-lg px-4 py-2">
        <div className="flex gap-1 lg:gap-4 items-center text-gray-secondary text-sm text-left text-nowrap">
          <div className="w-[265px] flex gap-4">
            <div className="w-[39px] shrink-0 min-w-[33px]">Rank</div>
            <div className="w-full">User</div>
          </div>
          <div className="w-[718px] flex items-center gap-1 lg:gap-4">
            <div className="w-[115px]">Bets</div>
            <div className="w-[115px]">Wins</div>
            <div className="w-[115px]">Win rate</div>
            <div className="w-[115px]">Top streak</div>
            <div className="w-[115px]">ROI</div>
            <div className="w-[63px] shrink-0 text-right">Net profit</div>
          </div>
        </div>
      </div>
      {demoUsers.map((user, index) => (
        <div key={index} className="w-full bg-card-primary rounded-lg px-4 py-2">
          <div className="flex gap-1 lg:gap-4 items-center text-gray-secondary text-sm text-left text-nowrap">
            <div className="w-[265px] flex gap-4">
              <div className="w-[39px] shrink-0 min-w-[33px]">{user.rank}</div>
              <div className="w-full">
                <div className="flex items-center gap-2">
                  <img src={user.avatar} alt="user" className="w-6 h-6 rounded-full" />
                  <p className="text-gray-secondary text-sm">{user.username}</p>
                </div>
              </div>
            </div>
            <div className="w-[718px] flex items-center gap-1 lg:gap-4">
              <div className="w-[115px]">{user.bets}</div>
              <div className="w-[115px]">{user.wins}</div>
              <div className="w-[115px]">{(user.winRate * 100).toFixed(0)}%</div>
              <div className="w-[115px]">{user.topSteak}</div>
              <div className={`w-[115px] ${user.roi < 0 ? "text-negative-light" : "text-positive-light"}`}>
                {user.roi < 0 
                  ? `- ${(Math.abs(user.roi) * 100).toFixed(0)}%` 
                  : user.roi > 0 
                    ? `+ ${(user.roi * 100).toFixed(0)}%` 
                    : user.roi
                }
              </div>
              <div className={`w-[63px] shrink-0 text-right ${user.netProfit < 0 ? "text-negative-light" : "text-positive-light"}`}>
                {user.netProfit < 0 
                  ? `- $${Math.abs(user.netProfit)}` 
                  : user.netProfit > 0 
                    ? `+ $${user.netProfit}` 
                    : user.netProfit
                }
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TopUserList