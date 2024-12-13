import UpVector from '../../assets/icons/up.svg';
import DownVector from '../../assets/icons/down.svg';
const UpDownVector = ({ state }: Props) => {
  return (
    <div className="flex justify-center items-center w-8 h-8">
      {state === 'up' && <img src={UpVector} alt="Up Arrow" className="" />}
      {state === 'down' && <img src={DownVector} alt="Down Arrow" className="" />}
    </div>
  )
}

interface Props {
  state: 'up' | 'down'
}

export default UpDownVector