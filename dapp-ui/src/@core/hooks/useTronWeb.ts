import { useState, useEffect } from 'react'
import { errorString } from 'src/@core/utils/text-format'

declare global {
  interface Window {
    tronWeb: any;
  }
}

interface TronHookType {
  isConnect: boolean;
  address: string;
  trc20: any;
}

function isTronWebConnected(): boolean {
  // const solidityNode: string = process.env.SOLIDITY_NODE || ''

  return typeof window !== "undefined"
    && window.tronWeb
    && window.tronWeb.defaultAddress.base58
    // && window.tronWeb.solidityNode.host === solidityNode
}

function walletAddress(): string {
  if (typeof window !== "undefined" && window.tronWeb)
    return window.tronWeb.defaultAddress.base58
  else
    return ''
}

export default function useTronWeb(): TronHookType {
  const [isConnect, setIsConnect] = useState(isTronWebConnected())
  const [address, setAddress] = useState(walletAddress())
  
  // trc20
  const [trc20Address, setTrc20Address] = useState('')
  const [trc20Name, setTrc20Name] = useState('')
  const [trc20Symbol, setTrc20Symbol] = useState('')
  const [trc20Decimals, setTrc20Decimals] = useState(0)
  const [trc20Error, setTrc20Error] = useState('')

  const tronLinkEventListener = (e: MessageEvent) => {
    switch (e.data.message && e.data.message.action) {
      case 'accountsChanged':
        console.log('accountsChanged', e.data.message.address)
        setAddress(walletAddress())
        break
      case 'setNode':
        console.log('setNode', e.data.message.data.node)
        setIsConnect(isTronWebConnected())
        break
      case 'disconnect':
        console.log('TronWeb disconnect')
        setIsConnect(false)
        setAddress('')
        break
      case 'connect':
        console.log('TronWeb connected')
        setIsConnect(isTronWebConnected())
        setAddress(walletAddress())
        break
    }
  }

  useEffect(() => {
    window.addEventListener('message', tronLinkEventListener)
    return () => {
      window.removeEventListener('message', tronLinkEventListener)
    }
  }, []);

  async function trc20Call(trc20ContractAddress: string, methodName: string) {
    try {
      const contract = await window.tronWeb.contract().at(trc20ContractAddress)
      const result = await contract[methodName]().call()
      console.log('trc20Call', result)
    } catch(error) {
      console.error('trc20Call error:', error)
    }
  }

  async function trc20ContractAddress(trc20ContractAddress: string) {
    try {
      const contract = await window.tronWeb.contract().at(trc20ContractAddress)
      setTrc20Error('')
      setTrc20Name(await contract.name().call())
      setTrc20Symbol(await contract.symbol().call())
      setTrc20Decimals(parseInt(await contract.decimals().call()))
      setTrc20Address(trc20ContractAddress)
      return true
    } catch(error) {
      console.log(error)
      setTrc20Error(errorString(error))
      setTrc20Name('')
      setTrc20Symbol('')
      setTrc20Decimals(0)
      setTrc20Address('')
      return false
    }
  }

  return {
    isConnect,
    address,
    trc20: {
      setContractAddress: trc20ContractAddress,
      address: trc20Address,
      name: trc20Name,
      symbol: trc20Symbol,
      decimals: trc20Decimals,
      error: trc20Error,
    },
  }
}
