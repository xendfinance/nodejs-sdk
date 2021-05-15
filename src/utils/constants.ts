import BigNumber from 'bignumber.js';

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

export const WEI = new BigNumber('1e18');

export const PROVIDERS = {
  ETHEREUM_MAINNET: {
    currency: "DAI",
    url: 'https://eth-mainnet.alchemyapi.io/v2/2gdCD03uyFCNKcyEryqJiaPNtOGdsNLv'
  },
  BSC_MAINNET: {
    currency: "BUSD",
    url: ""
  },
  BSC_TESTNET: {
    currency: "BUSD",
    url: ""
  },
  LOCALHOST: {
    currency: "BUSD",
    url: 'http://127.0.0.1:8545'
  }
}