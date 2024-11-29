import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
import solanaLogo from '../assets/images/solana-logo.png';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from "../contexts/WalletModalProvider"
import userAvatar from '../assets/images/users/avatar1.png';
import TermAgreementModal from '../components/TermAgreementModal';
const Navbar: React.FC = () => {
  const { connecting, connected, disconnect, publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_balance] = useState<number>(100.67);
  const [isTermAgreementModalOpen, setIsTermAgreementModalOpen] = useState(true);

  const handleConnect = async () => {
    setVisible(true);
  };

  const handleDisconnect = async () => {
    await disconnect();
  };

  return (
    <>
      <nav className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <img src={logo} alt="Logo" className="h-full" />
          <div className="flex items-center gap-4">
            <button className="rounded-lg py-2 px-3 bg-card-primary text-gray-primary">Crypto</button>
            <button className="rounded-lg py-2 px-3 text-gray-secondary">Docs</button>
          </div>
        </div>
        <div>
          {!connected && (
            <div className="flex justify-end items-center gap-2">
              <div>
                <img src={solanaLogo} alt="Logo" className="h-[22px] w-5" />
              </div>
              <button className="bg-yellow p-2 rounded-lg text-black text-base leading-5 font-oxanium font-semibold" onClick={handleConnect}>
                {connecting ? 'Connecting' : 'Connect'}
              </button>
            </div>
          )}
          {connected && (
            <div className="flex justify-end items-center gap-2">
              <p className="text-gray-primary text-base leading-tight">$ {publicKey?.toBase58()}</p>
              <button className="w-9 h-9 rounded-full overflow-hidden" onClick={handleDisconnect}>
                <img src={userAvatar} alt="User Avatar" className="w-full h-full object-cover" />
              </button>
            </div>
          )}
        </div>
      </nav>
      {isTermAgreementModalOpen && <TermAgreementModal setOpen={setIsTermAgreementModalOpen} />}
    </>
  );
};

export default Navbar;
