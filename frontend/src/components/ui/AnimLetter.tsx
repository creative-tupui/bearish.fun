const AnimLetter = ({ letter }: props) => {
  return (
    <div className="px-1 py-3 rounded bg-bg">
      <div className={`h-[25px] flex justify-center items-center ${letter === ',' || letter === '.' ? '' : 'w-[21px]'}`}>
        <span className="font-oxanium text-accent font-semibold text-4xl leading-[1.11] text-center tracking-[-0.03em]">{letter}</span>
      </div>
    </div>
  )
}

interface props {
  letter: string
}

export default AnimLetter