import React, { createContext, useContext, useState } from "react";

const ManageWalletDropdownContext = createContext<{isVisible:boolean, setIsManageWalletDropdownOpen: (visible: boolean) => void} | undefined>(undefined);

export const ManageWalletDropdownProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const setIsManageWalletDropdownOpen = (visible: boolean) => setIsVisible(visible);
  return (
    <ManageWalletDropdownContext.Provider value={{ isVisible, setIsManageWalletDropdownOpen }}>
      {children}
    </ManageWalletDropdownContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useManageWalletDropdown = () => {
  const context = useContext(ManageWalletDropdownContext);
  if (context === undefined) {
    throw new Error('useManageWalletDropdown must be used within a ManageWalletDropdownProvider');
  }
  return context;
};
