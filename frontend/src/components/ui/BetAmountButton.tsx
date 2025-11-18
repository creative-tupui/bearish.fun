interface BetAmountButtonProps {
  betAmount: number;
  selectedBetAmount: number;
  setBetAmount: (amount: number) => void;
}

const BetAmountButton = ({ betAmount, selectedBetAmount, setBetAmount }: BetAmountButtonProps) => {
  return (
    <button 
      className={
        `w-11 h-9 flex justify-center items-center rounded-lg text-base leading-tight
        ${betAmount === selectedBetAmount ? 'bg-accent text-black' : 'bg-card-secondary hover:bg-card-stroke text-gray-secondary'}`
      }
      onClick={() => setBetAmount(betAmount)}
    >
      ${betAmount}
    </button>
  )
}

export default BetAmountButton