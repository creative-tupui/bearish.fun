import { useWallet } from "@solana/wallet-adapter-react"
import Modal from "./ui/Modal"

const WalletModal = ({ setOpen }: Props) => {
  const { wallets, select } = useWallet()

  return (
    <Modal title="Connect Wallet" onClose={() => setOpen(false)}>
      <div className="flex flex-col gap-4">
        {wallets.map((wallet, index) => (
          <div className="w-full flex items-center justify-center" key={index}>
            <button
              type="button"
              onClick={() => {
                // If wallet not detected, open adapter url if it exists
                if (wallet.readyState === "NotDetected") {
                  if (wallet.adapter?.url) {
                    window.open(wallet.adapter?.url, "_blank")
                  }
                }

                console.log("selecting wallet:", wallet.adapter.name);
                select(wallet.adapter.name)
                setOpen(false)
              }}
              className="w-full p-2 flex items-center gap-2 rounded-lg bg-card-secondary"
            >
              <img
                alt="icon"
                width="20"
                height="20"
                className=""
                src={wallet.adapter.icon}
              />
              <p className="text-base font-medium leading-tight text-gray-primary">{wallet.adapter.name}</p>
            </button>
          </div>
        ))}
      </div>
    </Modal>
  )
}

interface Props {
  setOpen: (open: boolean) => void
}

export default WalletModal