const mainnet = {
  host: 'https://api.trongrid.io',
  contractAddress: '',
  explorer: 'https://tronscan.io',
}

const shasta = {
  host: 'https://api.shasta.trongrid.io',
  contractAddress: 'TN6Rf7j5RRRwRySf6TmsSRoo3713zrLamK',
  explorer: 'https://shasta.tronscan.org',
}

const nile = {
  host: 'https://api.nileex.io',
  contractAddress: '',
  explorer: 'https://nile.tronscan.org',
}

const contractConfig = [shasta, mainnet, nile]

export default contractConfig
