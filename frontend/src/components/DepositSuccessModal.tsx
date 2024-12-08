import Modal from "./ui/Modal"
import Button from "./ui/Button";

const DepositSuccessModal = ({ depositedAmount, transactionLink, setOpen }: Props) => {
  const viewTransctionFunction = () => {
    console.log(transactionLink);
    setOpen(false);
  };
  const finishFunction = () => {
    console.log("Finish");
    setOpen(false);
  };

  return (
    <Modal title="Deposit" onClose={() => setOpen(false)}>
      <div className="flex flex-col gap-6">
        <p className="text-base leading-tight text-gray-secondary">You deposited ${depositedAmount} into Bearish.</p>
        <div className="flex gap-4">
          <Button title="View tx" style="dark" className="py-4" onClick={viewTransctionFunction} />
          <Button title="Finish" style="accent" className="py-4" onClick={finishFunction} />
        </div>
      </div>
    </Modal>
  )
}

interface Props {
  depositedAmount: number;
  transactionLink: string;
  setOpen: (open: boolean) => void
}

export default DepositSuccessModal