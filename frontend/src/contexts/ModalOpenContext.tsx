import React, { createContext, useContext, useState } from "react";

const ModalOpenContext = createContext<{
  isManageWalletDropdownVisible:boolean,
  setIsManageWalletDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>
} | undefined>(undefined);

export const ModalOpenProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isManageWalletDropdownVisible, setIsManageWalletDropdownVisible] = useState<boolean>(false);

  return (
    <ModalOpenContext.Provider value={{ 
      isManageWalletDropdownVisible,
      setIsManageWalletDropdownVisible
    }}>
      {children}
    </ModalOpenContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useModalOpenContext = () => {
  const context = useContext(ModalOpenContext);
  if (context === undefined) {
    throw new Error('useModalOpenContext must be used within a ModalOpenProvider');
  }
  return context;
};
