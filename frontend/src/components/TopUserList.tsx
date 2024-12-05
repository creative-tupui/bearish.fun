import { demoUsersInfo } from "../constants/demoInfo";
const TopUserList = () => {
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="w-full bg-card-primary rounded-lg px-4 py-2">
        <div className="flex justify-between gap-1 lg:gap-4 items-center text-gray-secondary text-sm text-left text-nowrap">
            <div className="w-[39px] shrink-0 min-w-[33px]">Rank</div>
            <div className="w-[154px] shrink-0">User</div>
            <div className="w-full flex justify-between items-center">
              <div className="w-[36px]">Bets</div>
              <div className="w-[36px]">Wins</div>
              <div className="w-[62px]">Win Rate</div>
              <div className="w-[65px]">Net Profit</div>
            </div>
        </div>
      </div>
      {demoUsersInfo.map((user, index) => (
        <div key={index} className="w-full bg-card-primary rounded-lg px-4 py-2">
          <div className="flex justify-between gap-1 lg:gap-4 items-center text-gray-secondary text-sm text-left text-nowrap">
            <div className="w-[39px] shrink-0 min-w-[33px]">{user.rank}</div>
            <div className="w-[154px] shrink-0">
              <div className="flex items-center gap-2">
                <img src={user.avatar} alt="user" className="w-6 h-6 rounded-full" />
                <p className="text-gray-secondary text-sm">{user.username}</p>
              </div>
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="w-[36px]">{user.bets}</div>
              <div className="w-[36px]">{user.wins}</div>
              <div className="w-[62px]">{user.winRate}</div>
              <div className="w-[65px]">{user.netProfit}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TopUserList