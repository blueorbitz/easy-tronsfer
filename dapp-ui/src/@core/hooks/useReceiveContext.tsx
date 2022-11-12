import React, {
  useState,
  useEffect,
  createContext,
  useContext,
} from 'react'
import { useSession } from 'next-auth/react'
import { getBalance, getProviderId } from 'src/@core/utils/tron-utils'

//create a context, with createContext api
export const ReceiveContext = createContext<any>(null);

export const ReceiveContextProvider = (props: React.ComponentProps<any>) => {
  const { data: session } = useSession()
  const [balance, setBalance] = useState<any[]>([])
  const [tokenAddress, setTokenAddress] = useState('')
  const [transferAmount, setTransferAmount] = useState(0)
  const [receiverProvider, setReceiverProvider] = useState('')
  const [receiverUserId, setReceiverUserId] = useState('')
  const [receiverUsername, setReceiverUsername] = useState('')

  const providerId = () => {
    const account = session?.account
    const provider = account?.provider ?? ''
    const providerAccountId = account?.providerAccountId ?? ''

    return getProviderId(provider, providerAccountId)
  }

  const fetchBalance = async () => {
    const data = await getBalance(providerId())
    setBalance(data)
  }
  
  useEffect(() => {
    fetchBalance()
  }, [session])

  return (
    <ReceiveContext.Provider value={{
      providerId,
      balance, fetchBalance,
      tokenAddress, setTokenAddress,
      transferAmount, setTransferAmount,
      receiverProvider, setReceiverProvider,
      receiverUserId, setReceiverUserId,
      receiverUsername, setReceiverUsername,
    }}>
      {props.children}
    </ReceiveContext.Provider>
  );
};

const useReceiveContext = () => useContext(ReceiveContext)
export default useReceiveContext
