import { useState } from "react";
import Modal from "./ui/Modal"
import Button from "./ui/Button";

const WithdrawModal = ({ callback, setOpen }: Props) => {
  const [withdrawAmount, setWithdrawAmount] = useState<string>("0");

  const handleCancel = () => {
    setOpen(false);
  };

  const handlewithdraw = () => {
    console.log(`withdrawing: $${withdrawAmount}`);
    setOpen(false);
    // callback(true, Number(withdrawAmount), "https://solana.com");
    callback(false)
  };

  return (
    <Modal title="Withdraw" onClose={() => setOpen(false)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-base text-gray-secondary">
            <div><p>Withdraw amount</p></div>
            <div className="flex gap-2">
              <p>$ 14.14</p>
              <p className="font-bold text-accent">Max</p>
            </div>
          </div>
          <div className="flex justify-between items-center border border-gray-tertiary rounded-lg p-2 text-base">
            <div className="flex items-center gap-2 text-gray-secondary">
              <p>$</p>
              <input type="text" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} className="w-full" />
            </div>
            <p className="text-gray-tertiary">USDC</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p>Balance</p>
          <div className="flex items-center gap-2 text-gray-secondary">
            <p>$ 14.29</p>
            <img src="/src/assets/icons/arrow-right.png" alt="" className="" />
            <p>$ 0.15</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button title="Cancel" style="dark" className="py-4" onClick={handleCancel} />
          <Button title="Withdraw" style="accent" className="py-4" onClick={handlewithdraw} />
        </div>
      </div>
    </Modal>
  )
}

interface Props {
  callback: (result: boolean, withdrawedAmount?: number, transactionLink?: string) => void;
  setOpen: (open: boolean) => void
}

export default WithdrawModal