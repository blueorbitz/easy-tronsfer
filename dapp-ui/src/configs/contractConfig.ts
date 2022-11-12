const mainnet = {
  host: 'https://api.trongrid.io',
  contractAddress: '',
  explorer: 'https://tronscan.io',
  owner: '',
}

const shasta = {
  host: 'https://api.shasta.trongrid.io',
  contractAddress: 'TN6Rf7j5RRRwRySf6TmsSRoo3713zrLamK',
  explorer: 'https://shasta.tronscan.org',
  owner: 'TR5ytRjWDPoNUWcwD6shurJSsrxBWUmboZ',
}

const nile = {
  host: 'https://api.nileex.io',
  contractAddress: '',
  explorer: 'https://nile.tronscan.org',
  owner: '',
}

const contractConfig = [shasta, mainnet, nile]

export default contractConfig
