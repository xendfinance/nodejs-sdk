import Web3 from 'web3';
import { ChainId, PROVIDERS } from './constants'

export const checkChainId = (chainId: number) => {

    switch (chainId) {
        case ChainId.ETHEREUM_MAINNET:
            return PROVIDERS.ETHEREUM_MAINNET;

        case ChainId.BSC_TESTNET:
            return PROVIDERS.BSC_TESTNET;

        case ChainId.BSC_MAINNET:
            return PROVIDERS.BSC_MAINNET

        case ChainId.LOCALHOST:
            return PROVIDERS.LOCALHOST;

        default: return PROVIDERS.LOCALHOST;
    }

}



export const providerToChainID = (provider: string) => {

    let providers = Object.values(PROVIDERS)

    const df = providers.filter(item => item.url === provider)

    if (df.length > 0) {
        return df[0].chain
    } else {
        return 0
    }

}


export const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getAddressByName = (addresses: any[], name: string) => {
    const filter = addresses.filter(addr => addr.name === name);
    if (filter.length > 0) {
        return filter[0].address;
    }
    return "";
}



export const formatAmount = (
    amount: any,
    network: number,
    assetName: string) => {

    if (network == 56) {
        return Web3.utils.toWei(amount, 'ether');
    } else if (network == 137) {

        if (assetName === 'WBTC') {
            return parseFloat(amount) * Math.pow(10, 8);
        }
        if (assetName === 'AAVE') {
            return Web3.utils.toWei(amount, 'ether');
        }
        return Web3.utils.toWei(amount, 'mwei')
    } else return amount;

}