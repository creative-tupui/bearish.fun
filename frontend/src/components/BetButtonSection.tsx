import BetButton from "./ui/BetButton"

const BetButtonSection = () => {
  return (
    <div className="flex gap-2">
      <BetButton betType="up" setBetType={() => {}} />
      <BetButton betType="down" setBetType={() => {}} />
    </div>
  )
}

export default BetButtonSection