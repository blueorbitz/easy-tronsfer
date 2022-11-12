
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