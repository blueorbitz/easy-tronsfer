
export function getProviderId(provider: string, userId: string) {
  return provider + '_' + userId
}

export async function getTokenInfo(tronWeb: any, tokenAddress: string) {
  const contract = await tronWeb.contract().at(tokenAddress)
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

export async function getBalance(tronWeb: any, handler: any, providerId: string) {
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
    getTokenInfo(tronWeb, tokenAddress)
  ))

  const tokenBalanceInBigNumber = await Promise.all(tokenAddresses.map(tokenAddress =>
    handler.trc20AccountBalance(providerId, tokenAddress).call()
  ))

  const trc20details = tokenAddresses.map((tokenAddress, i) => {
    const balanceContract = tronWeb.toDecimal(tokenBalanceInBigNumber[i])
    const balanceDisplay = tokenInfos[i].amountFromContract(balanceContract)

    return { ...tokenInfos[i], balance: balanceDisplay }
  })

  const trxDetails = []
  try {
    const trxBalanceInBigNumber = await handler.trxBalance(providerId).call()
    const trxBalanceDisplay = tronWeb.fromSun(trxBalanceInBigNumber)
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