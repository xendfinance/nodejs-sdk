import { ChainId, PROVIDERS } from './constants'

export const checkChainId = (chainId: ChainId) => {

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