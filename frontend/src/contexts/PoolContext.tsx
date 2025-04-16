// frontend/src/contexts/PoolContext.tsx
import React, { createContext, useContext, useState } from "react";
import { demoUsersInfo } from "../constants/demoInfo";
import { jackpotDemoUsers } from "../constants/demoInfo";


type PoolContextType = {
  upPool: number;
  downPool: number;
  upPoolInvestors: string[];
  downPoolInvestors: string[];
  jackpotAmount: number;
  lastWonTime: string;
  demoUsers: typeof demoUsersInfo;
  jackpotUsers: typeof jackpotDemoUsers;
  setUpPool: React.Dispatch<React.SetStateAction<number>>;
  setDownPool: React.Dispatch<React.SetStateAction<number>>;
  setUpPoolInvestors: React.Dispatch<React.SetStateAction<string[]>>;
  setDownPoolInvestors: React.Dispatch<React.SetStateAction<string[]>>;
  setJackpotAmount: React.Dispatch<React.SetStateAction<number>>;
  setLastWonTime: React.Dispatch<React.SetStateAction<string>>;
  setDemoUsers: React.Dispatch<React.SetStateAction<typeof demoUsersInfo>>;
  setJackpotUsers: React.Dispatch<React.SetStateAction<typeof jackpotDemoUsers>>;
  updateUpPool: (amount: number, newInvestor: string) => void;
  updateDownPool: (amount: number, newInvestor: string) => void;
};

const PoolContext = createContext<PoolContextType | undefined>(undefined);

export const PoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [upPool, setUpPool] = useState<number>(0);
  const [downPool, setDownPool] = useState<number>(0);
  const [upPoolInvestors, setUpPoolInvestors] = useState<string[]>([]);
  const [downPoolInvestors, setDownPoolInvestors] = useState<string[]>([]);
  const [jackpotAmount, setJackpotAmount] = useState<number>(100.687);
  const [lastWonTime, setLastWonTime] = useState<string>("52 min");

  const [demoUsers, setDemoUsers] = useState<typeof demoUsersInfo>(demoUsersInfo);
  const [jackpotUsers, setJackpotUsers] = useState<typeof jackpotDemoUsers>(jackpotDemoUsers);

  

  const updateUpPool = (amount: number, newInvestor: string) => {
    setUpPool(prev => prev + amount);
    setUpPoolInvestors(prev => [...prev, newInvestor]);
  };

  const updateDownPool = (amount: number, newInvestor: string) => {
    setDownPool(prev => prev + amount);
    setDownPoolInvestors(prev => [...prev, newInvestor]);
  };

  return (
    <PoolContext.Provider value={{
      upPool,
      downPool,
      upPoolInvestors,
      downPoolInvestors,
      jackpotAmount,
      lastWonTime,
      demoUsers,
      jackpotUsers,
      setUpPool,
      setDownPool,
      setUpPoolInvestors,
      setDownPoolInvestors,
      setJackpotAmount,
      setLastWonTime,
      setDemoUsers,
      setJackpotUsers,
      updateUpPool,
      updateDownPool
    }}>
      {children}
    </PoolContext.Provider>
  );
};

export const usePoolContext = () => {
  const context = useContext(PoolContext);
  if (context === undefined) {
    throw new Error('usePoolContext must be used within a PoolProvider');
  }
  return context;
};