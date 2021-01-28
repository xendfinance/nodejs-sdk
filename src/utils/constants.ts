import BigNumber from 'bignumber.js';

export enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GÖRLI = 5,
  KOVAN = 42
}

export enum SavingStrategyType  {
    YEARN_FINANCE,
    DEFI_DOLLARS
}

export const WEI = new BigNumber('1e18');

export const PROVIDERS = {
    MAINENT : 'https://mainnet.infura.io/v3/e9c4665d91a343e295308d5995ff5a72',
    ROPSTEN : 'https://ropsten.infura.io/v3/e9c4665d91a343e295308d5995ff5a72',
    RINKEBY : 'https://rinkeby.infura.io/v3/e9c4665d91a343e295308d5995ff5a72',
    LOCALHOST : 'HTTP://127.0.0.1:8545'
}