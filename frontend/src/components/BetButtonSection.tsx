import BetButton from "./ui/BetButton"

const BetButtonSection = () => {
  const betFunction = (betType: 'up' | 'down') => {
    console.log(betType);
  };
  return (
    <div className="flex gap-2">
      <BetButton betType="up" betFunction={betFunction} />
      <BetButton betType="down" betFunction={betFunction} />
    </div>
  )
}

export default BetButtonSection