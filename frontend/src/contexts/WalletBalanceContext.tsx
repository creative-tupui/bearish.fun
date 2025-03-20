import React, { createContext, useContext, useState, useEffect } from "react";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { useWallet } from '@solana/wallet-adapter-react';
import { getUserUsdtAccount } from '../utils';

const WalletBalanceContext = createContext<{
  walletBalance: number;
  refreshBalance: () => void;
} | undefined>(undefined);

export const WalletBalanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const { publicKey } = useWallet();

  const fetchBalance = async () => {
    if (publicKey) {
      const connection = new Connection(clusterApiUrl("devnet"), {
        commitment: "confirmed",
      });
      
      // Get the associated token account for USDT
      const usdtAta = await getUserUsdtAccount(publicKey);
      
      // Fetch the USDT balance
      const balance = await connection.getTokenAccountBalance(usdtAta);
      setWalletBalance(balance.value.uiAmount || 0); // Set the balance in USDT
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [publicKey]);

  return (
    <WalletBalanceContext.Provider value={{ walletBalance, refreshBalance: fetchBalance }}>
      {children}
    </WalletBalanceContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWalletBalanceContext = () => {
  const context = useContext(WalletBalanceContext);
  if (context === undefined) {
    throw new Error('useWalletBalanceContext must be used within a WalletBalanceProvider');
  }
  return context;
}; 