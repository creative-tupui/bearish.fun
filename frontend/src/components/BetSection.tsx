import BetAmountSetSection from "./BetAmountSetSection"
import BetButtonSection from "./BetButtonSection"
import BettedUserSection from "./BettedUserSection"
import AutoModeSection from "./AutoModeSection"

const BetSection = () => {
  return (
    <div className="bg-card-primary rounded-lg p-4 flex flex-col gap-4">
      <BetAmountSetSection />
      <BetButtonSection />
      <BettedUserSection />
      <AutoModeSection />
    </div>
  )
}

export default BetSection