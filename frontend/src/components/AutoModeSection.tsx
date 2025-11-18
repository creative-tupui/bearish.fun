import { useState } from "react"

const AutoModeSection = () => {
  const [selected, setSelected] = useState(false);
  return (
    <div className="bg-card-secondary rounded-lg px-4 py-2 flex justify-between items-center gap-1">
      <div className="text-base font-medium text-gray-secondary">Auto Mode</div>
      <div className="relative flex">
        <div className={`w-5 h-5 border-2 rounded-[4px] flex justify-center items-center ${selected ? 'bg-accent border-accent' : ' border-gray-tertiary'}`}>
          {selected && <img src="/src/assets/icons/check.png" alt="" className="w-3 h-3" />}
        </div>
        <input
          type="checkbox"
          checked={selected}
          onChange={(e) => {setSelected(e.target.checked)}}
          className="w-5 h-5 absolute opacity-0 cursor-pointer"
        />
      </div>
    </div>
  )
}

export default AutoModeSection