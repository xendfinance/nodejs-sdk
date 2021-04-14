import BigNumber from 'bignumber.js';

export enum ChainId {
  MAINNET = 56,
  ROPSTEN = 3,
  RINKEBY = 4,
  GÖRLI = 5,
  KOVAN = 42,
  LOCALHOST = 0
}

export enum SavingStrategyType  {
    YEARN_FINANCE,
    DEFI_DOLLARS
}

export const WEI = new BigNumber('1e18');

export const PROVIDERS = {
    MAINENT : 'https://eth-mainnet.alchemyapi.io/v2/2gdCD03uyFCNKcyEryqJiaPNtOGdsNLv',
    ROPSTEN : 'https://ropsten.infura.io/v3/e9c4665d91a343e295308d5995ff5a72',
    RINKEBY : 'https://rinkeby.infura.io/v3/e9c4665d91a343e295308d5995ff5a72',
    LOCALHOST : 'http://127.0.0.1:8545'
}