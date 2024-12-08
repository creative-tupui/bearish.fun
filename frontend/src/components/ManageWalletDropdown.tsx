import { useWallet } from "@solana/wallet-adapter-react";
import Button from "./ui/Button";
import { useManageWalletDropdown } from "../contexts/ManageWalletDropDownContext";

const ManageWalletDropdown = () => {
  const { publicKey } = useWallet();
  const connectedWallet = publicKey?.toBase58();
  const { setIsManageWalletDropdownOpen } = useManageWalletDropdown();

  return (
    <>
      <div className="absolute top-0 left-0 w-[431px] bg-card-primary z-20 rounded-lg p-4 border border-card-stroke">
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium text-gray-primary">Manage Wallet</p>
            <img src="/src/assets/icons/power-off.png" alt="" className="w-5 h-5 cursor-pointer" onClick={() => setIsManageWalletDropdownOpen(false)} />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center bg-card-secondary rounded-lg p-3 text-gray-secondary text-base">
              <p className="">Connected Wallet</p>
              <div className="flex items-center gap-2">
                {connectedWallet && (
                  <p>{`${connectedWallet.substring(0, 4)}...${connectedWallet.substring(connectedWallet.length - 4)}`}</p>
                )}
                <img src="/src/assets/icons/copy.png" alt="" className="w-4 h-4" />
              </div>
            </div>
            <div className="flex flex-col gap-4 bg-card-secondary rounded-lg p-3">
              <div className="flex justify-between items-center text-gray-secondary text-base">
                <p>Balance</p>
                <p>$ 0.00</p>
              </div>
              <div className="flex gap-2">
                <Button title="Withdraw" style="dark" onClick={() => {}} />
                <Button title="Deposit" style="accent" onClick={() => {}} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 bg-bg bg-opacity-50 z-10"></div>
    </>
  );
};

export default ManageWalletDropdown;