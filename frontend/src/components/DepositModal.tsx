import { useState } from "react";
import Modal from "./ui/Modal"
import Button from "./ui/Button";

const DepositModal = ({ setOpen }: Props) => {
  const [depositAmount, setDepositAmount] = useState<string>("0");

  return (
    <Modal title="Deposit" onClose={() => setOpen(false)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-base text-gray-secondary">
            <div><p>Deposit amount</p></div>
            <div className="flex gap-2">
              <p>$ 14.14</p>
              <p className="font-bold text-accent">Max</p>
            </div>
          </div>
          <div className="flex justify-between items-center border border-gray-tertiary rounded-lg p-2 text-base">
            <div className="flex items-center gap-2 text-gray-secondary">
              <p>$</p>
              <input type="text" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} className="w-full" />
            </div>
            <p className="text-gray-tertiary">USDC</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p>Balance</p>
          <div className="flex items-center gap-2 text-gray-secondary">
            <p>$ 0.15</p>
            <img src="/src/assets/icons/arrow-right.png" alt="" className="" />
            <p>$ 14.29</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button title="Withdraw" style="dark" className="py-4" onClick={() => {}} />
          <Button title="Deposit" style="accent" className="py-4" onClick={() => {}} />
        </div>
        <div className="flex justify-between text-xs font-semibold">
          <p className="text-gray-secondary">Don’t have USDC on Solana?</p>
          <p className="text-accent">Swap or bridge here</p>
        </div>
      </div>
    </Modal>
  )
}

interface Props {
  setOpen: (open: boolean) => void
}

export default DepositModal