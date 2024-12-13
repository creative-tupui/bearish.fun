import BettedUsersComponent from "./BettedUsersComponent"
import avatar1 from "../assets/images/users/avatar1.png"

const BettedUserSection = () => {
  const investors = [
    avatar1,
    avatar1,
    avatar1,
    avatar1,
    avatar1,
    avatar1,
    avatar1,
  ]
  
  return (
    <div className="flex gap-2">
      <BettedUsersComponent betType="up" pool={105} potential={180} investors={investors} />
      <BettedUsersComponent betType="down" pool={200} potential={150} investors={investors} />
    </div>
  )
}

export default BettedUserSection