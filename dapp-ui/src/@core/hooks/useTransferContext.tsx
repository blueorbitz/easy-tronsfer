import React, { useState, createContext, useContext } from 'react'

//create a context, with createContext api
export const TransferContext = createContext<any>(null)

export const TransferContextProvider = (props: React.ComponentProps<any>) => {
  const [tokenAddress, setTokenAddress] = useState('')
  const [transferAmount, setTransferAmount] = useState(0)
  const [receiverProvider, setReceiverProvider] = useState('')
  const [receiverUserId, setReceiverUserId] = useState('')
  const [receiverUsername, setReceiverUsername] = useState('')

  const resetAll = () => {
    setTokenAddress('')
    setTransferAmount(0)
    setReceiverProvider('')
    setReceiverUserId('')
    setReceiverUsername('')
  }

  return (
    <TransferContext.Provider value={{
      tokenAddress, setTokenAddress,
      transferAmount, setTransferAmount,
      receiverProvider, setReceiverProvider,
      receiverUserId, setReceiverUserId,
      receiverUsername, setReceiverUsername,
      resetAll,
    }}>
      {props.children}
    </TransferContext.Provider>
  );
};

const useTransferContext = () => useContext(TransferContext)
export default useTransferContext
