import BetAmountSetSection from "./BetAmountSetSection"
import BetButtonSection from "./BetButtonSection"

const BetSection = () => {
  return (
    <div className="bg-card-primary rounded-lg p-4 flex flex-col gap-4">
      <BetAmountSetSection />
      <BetButtonSection />
    </div>
  )
}

export default BetSection