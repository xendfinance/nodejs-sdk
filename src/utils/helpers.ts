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