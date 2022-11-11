import contractConfig from 'src/configs/contractConfig'

export function getContractConfig() {
  if (typeof window === 'undefined' || typeof window.tronWeb === 'undefined')
    return contractConfig[0]

  const node = window.tronWeb.solidityNode.host
  return contractConfig.find(o => o.host === node) ?? contractConfig[0]
}

async function getContractHandler() {
  if (typeof window === 'undefined' || typeof window.tronWeb === 'undefined')
    return null

  const contract = getContractConfig()
  const contractAddress = contract.contractAddress
  
  return await window.tronWeb.contract().at(contractAddress)
}

export function getProviderId(provider: string, userId: string) {
  return provider + '_' + userId
}

export async function convertTokenAmount(tokenAddress: string, amount: number) {
  const contract = await window.tronWeb.contract().at(tokenAddress)
  
  const decimals = parseInt(await contract.decimals().call())
  const _amount = amount * Math.pow(10, decimals)
  return _amount
}

export async function approveTrc20(tokenAddress: string, amount: number): Promise<any> {
  const contract = await window.tronWeb.contract().at(tokenAddress);

  return await contract.approve(getContractConfig().contractAddress, amount)
    .send({ feeLimit: 100_000_000 })
}

export async function transferTo(providerId: string, amount: number, tokenAddress: string|null = null) {
  const handler = await getContractHandler()

  const txOptions = {
    feeLimit: 500_000_000,
    callValue: 0,
    shouldPollResponse: false,
    keepTxID: true,
  }

  if (tokenAddress === null) {
    txOptions.callValue = window.tronWeb.toSun(amount)
    return await handler
      ?.transferTrx(providerId)
      .send(txOptions)
  }
  else {
    const _amount = await convertTokenAmount(tokenAddress, amount)
    await approveTrc20(tokenAddress, _amount)
    return await handler
      ?.transferTrc20(providerId, tokenAddress, _amount)
      .send(txOptions)
  }
}

export async function withdrawToWallet(providerId: string, amount: number, wallet: string, tokenAddress: string|null = null) {
}

export async function transferToProvider(fromProviderId: string, toProviderId: string, amount: number, tokenAddress: string|null = null) {
}

export async function getBalance(providerId: string) {
  const handler = await getContractHandler()
}