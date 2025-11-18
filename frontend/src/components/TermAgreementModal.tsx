import Modal from "./ui/Modal"

const TermAgreementModal = ({ setOpen }: Props) => {
  return (
    <Modal title="Terms and conditions" onClose={() => setOpen(false)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <p className="text-gray-secondary text-xs">By clicking “Agree,” you confirm that you have read, understood, and accept the following:</p>
          <div className="h-[115px] rounded-lg bg-card-secondary overflow-y-auto p-2">
            <pre className="text-[10px] leading-[160%] text-gray-secondary text-wrap text-left">
              You confirm that you are not a resident of any jurisdiction where the use of decentralized gambling or binary option platforms is restricted or prohibited by law. It is your responsibility to understand the legal restrictions in your location before using this platform.
              <br />
              <br />
              You acknowledge that this platform is based on decentralized technologies and involves high-risk activities. You understand that the value of assets wagered may fluctuate significantly, and you are prepared to accept the risks of loss.
              <br />
              <br />
              The platform is provided “as is” without warranties of any kind. We make no guarantees about the platform’s performance, uptime, or the accuracy of any information or services.
              <br />
              <br />
              You agree that the platform and its operators are not liable for any losses or damages you may incur from your participation, including but not limited to financial losses, technical errors, or legal consequences.
              <br />
              <br />
              You are solely responsible for the security of your crypto assets, wallet, and personal information while using the platform.
            </pre>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="w-full text-center py-4 rounded-lg text-base leading-tight text-gray-secondary bg-gray-secondary bg-opacity-10" onClick={() => setOpen(false)}>Decline</button>
          <button className="w-full text-center py-4 rounded-lg text-base leading-tight text-bg bg-accent" onClick={() => setOpen(false)}>Agree</button>
        </div>
      </div>
    </Modal>
  )
}

interface Props {
  setOpen: (open: boolean) => void
}

export default TermAgreementModal