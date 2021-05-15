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