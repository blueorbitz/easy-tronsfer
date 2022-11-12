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

export async function getTokenInfo(tokenAddress: string) {
  const contract = await window.tronWeb.contract().at(tokenAddress)
  const decimals = parseInt(await contract.decimals().call())

  return {
    address: tokenAddress,
    name: await contract.name().call(),
    symbol: await contract.symbol().call(),
    decimals,
    amountToContract: (amount: number) => amount * Math.pow(10, decimals),
    amountFromContract: (amount: number) => amount / Math.pow(10, decimals),
  }
}

export async function approveTrc20(tokenAddress: string, amount: number): Promise<any> {
  const contract = await window.tronWeb.contract().at(tokenAddress);

  return await contract.approve(getContractConfig().contractAddress, amount)
    .send({ feeLimit: 100_000_000 })
}

export async function transferTo(providerId: string, amount: number, tokenAddress: string | null = null) {
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
    const tokenInfo = await getTokenInfo(tokenAddress)
    const _amount = tokenInfo.amountToContract(amount)
    await approveTrc20(tokenAddress, _amount)
    return await handler
      ?.transferTrc20(providerId, tokenAddress, _amount)
      .send(txOptions)
  }
}

export async function withdrawToWallet(providerId: string, amount: number, wallet: string, tokenAddress: string | null = null) {
  const config = getContractConfig()
  const respose = await fetch('/api/tron/withdrawToWallet', {
    method: 'POST',
    body: JSON.stringify({ providerId, amount, wallet, tokenAddress, solidityNode: config.host })
  })
  return respose
}

export async function transferToProvider(fromProviderId: string, toProviderId: string, amount: number, tokenAddress: string | null = null) {
}

export async function getBalance(providerId: string) {
  const handler = await getContractHandler()

  const tokenAddresses: string[] = []
  try {
    for (let i = 0; true; i++) {
      const tokenAddress = await handler.trc20Accounts(providerId, i).call()
      tokenAddresses.push(tokenAddress)
    }
  } catch (error) {
    // swallow the error
  }

  const tokenInfos = await Promise.all(tokenAddresses.map(tokenAddress =>
    getTokenInfo(tokenAddress)
  ))

  const tokenBalanceInBigNumber = await Promise.all(tokenAddresses.map(tokenAddress =>
    handler.trc20AccountBalance(providerId, tokenAddress).call()
  ))

  const trc20details = tokenAddresses.map((tokenAddress, i) => {
    const balanceContract = window.tronWeb.toDecimal(tokenBalanceInBigNumber[i])
    const balanceDisplay = tokenInfos[i].amountFromContract(balanceContract)

    return { ...tokenInfos[i], balance: balanceDisplay }
  })

  const trxDetails = []
  try {
    const trxBalanceInBigNumber = await handler.trxBalance(providerId).call()
    const trxBalanceDisplay = window.tronWeb.fromSun(trxBalanceInBigNumber)
    trxDetails.push({
      name: 'Tron',
      symbol: 'TRX',
      balance: parseFloat(trxBalanceDisplay),
    })
  } catch (error) {
    // swallow the error
  }

  return [...trxDetails, ...trc20details]
}