
export enum ChainId {
  ETHEREUM_MAINNET = 1,
  BSC_MAINNET = 56,
  BSC_TESTNET = 97,
  LOCALHOST = 0
}

export enum SavingStrategyType {
  YEARN_FINANCE,
  DEFI_DOLLARS
}


export const PROVIDERS = {

  ETHEREUM_MAINNET: {
    currency: "DAI",
    url: 'https://eth-mainnet.alchemyapi.io/v2/2gdCD03uyFCNKcyEryqJiaPNtOGdsNLv',
    chain: 1
  },

  BSC_MAINNET: {
    currency: "BUSD",
    url: "https://bsc-dataseed.binance.org/",
    chain: 56
  },

  BSC_TESTNET: {
    currency: "BUSD",
    url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    chain: 97
  },

  LOCALHOST: {
    currency: "BUSD",
    url: 'http://127.0.0.1:8545',
    chain: 0
  }

}