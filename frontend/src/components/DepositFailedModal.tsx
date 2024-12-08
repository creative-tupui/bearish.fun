import Modal from "./ui/Modal"
import Button from "./ui/Button";

const DepositFailedModal = ({ setOpen }: Props) => {

  return (
    <Modal title="Error" onClose={() => setOpen(false)}>
      <div className="flex flex-col gap-6">
        <p className="text-base leading-tight text-gray-secondary">Something went wrong. Please try again.</p>
        <div className="flex gap-4">
          <Button title="Go back" style="accent" className="py-4" onClick={() => setOpen(false)} />
        </div>
      </div>
    </Modal>
  )
}

interface Props {
  setOpen: (open: boolean) => void
}

export default DepositFailedModal