import React, { ReactNode, useMemo } from 'react';
import {
  ConnectionProvider,
  WalletProvider as AdapterWalletProvider,
} from '@solana/wallet-adapter-react';
import {
  PhantomWalletAdapter,
  CoinbaseWalletAdapter,
  SolflareWalletAdapter,
  TrustWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletModalProvider } from './WalletModalProvider';

const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Configure the Solana network (e.g., 'mainnet-beta', 'testnet', 'devnet')
  const network = clusterApiUrl('devnet');

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new CoinbaseWalletAdapter(),
      new SolflareWalletAdapter(),
      new TrustWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={network}>
      <AdapterWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </AdapterWalletProvider>
    </ConnectionProvider>
  );
};

export default WalletProvider;
