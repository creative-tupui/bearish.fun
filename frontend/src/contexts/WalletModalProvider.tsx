/* eslint-disable @typescript-eslint/no-explicit-any */
import  { createContext, useContext, useMemo, useState } from "react"
import WalletModal from "@components/WalletModal"

const WalletModalContext = createContext<any>({
  visible: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setVisible: (_open: boolean) => {},
})

export const WalletModalProvider = ({ children }: Props) => {
  const [visible, setVisible] = useState(false)

  return (
    <WalletModalContext.Provider
      value={useMemo(
        () => ({
          visible,
          setVisible,
        }),
        [visible, setVisible],
      )}
    >
      {children}
      {visible && <WalletModal setOpen={setVisible} />}
    </WalletModalContext.Provider>
  )
}

interface Props {
  children: any
}
// eslint-disable-next-line react-refresh/only-export-components
export const useWalletModal = () => useContext(WalletModalContext)

