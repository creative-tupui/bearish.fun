import AnimLetter from "../components/ui/AnimLetter";
import { usePoolContext } from '../contexts/PoolContext';

const JackPotWonHistory = () => {
  const { jackpotAmount, lastWonTime } = usePoolContext();


  const splitNumber = (number: number) => {
    const formattedNumber = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);
    const [integerPart, decimalPart] = formattedNumber.split('.');
    let formattedIntegerPart = integerPart;
    if (formattedIntegerPart.length < 5) {
      formattedIntegerPart = '0'.repeat(5 - integerPart.length) + integerPart;
    }
    const formattedDecimalPart = decimalPart === "" ? '00' : decimalPart.length === 1 ? '0' + decimalPart : decimalPart;
    const integerPartWithCommas = formattedIntegerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const formattedString = `${integerPartWithCommas}.${formattedDecimalPart}`;
    return ['$'].concat(formattedString.split(''));
  };

  const jackPotWonAmountArray = splitNumber(jackpotAmount);
  return (
    <div className="bg-card-primary rounded-lg p-4 flex justify-center items-center">
      <div className="flex flex-col gap-2">
        <div className="flex gap-1">
          {jackPotWonAmountArray.map((letter, index) => (
            <AnimLetter key={index} letter={letter} />
          ))}
        </div>
        <div className="flex justify-center gap-2">
          <p className="text-xs text-gray-primary">Jackpot</p>
          <p className="text-xs text-gray-secondary">Last won {lastWonTime} ago</p>
        </div>
      </div>
    </div>
  )
}

export default JackPotWonHistory