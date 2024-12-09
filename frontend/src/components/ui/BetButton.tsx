interface BetButtonProps {
  betType: 'up' | 'down';
  betFunction: (betType: 'up' | 'down') => void;
}

const BetButton = ({ betType, betFunction }: BetButtonProps) => {
  return (
    <button 
      className={`w-full px-4 py-8 text-center rounded-lg text-base leading-tight ${betType === 'up' ? 'bg-positive-middle bg-opacity-10 text-positive-light' : 'bg-negative-light bg-opacity-10 text-negative-light'}`}
      onClick={() => betFunction(betType)}
    >
      {betType === 'up' ? 'Bet Up' : 'Bet Down'}
    </button>
  )
}

export default BetButton