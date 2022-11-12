const mainnet = {
  host: 'https://api.trongrid.io',
  contractAddress: '',
  explorer: 'https://tronscan.io',
  owner: '',
  ownerHex: '',
  contractHex: '',
}

const shasta = {
  host: 'https://api.shasta.trongrid.io',
  contractAddress: 'TN6Rf7j5RRRwRySf6TmsSRoo3713zrLamK',
  explorer: 'https://shasta.tronscan.org',
  owner: 'TR5ytRjWDPoNUWcwD6shurJSsrxBWUmboZ',
  ownerHex: '41a5d1d9e7850521b6f1f9f54ba8f571bffe8c90d4',
  contractHex: '4184fefc68e04cfdd77656f9b9fcea670f97c68b93',
}

const nile = {
  host: 'https://api.nileex.io',
  contractAddress: '',
  explorer: 'https://nile.tronscan.org',
  owner: '',
  ownerHex: '',
  contractHex: '',
}

const contractConfig = [shasta, mainnet, nile]

export default contractConfig
