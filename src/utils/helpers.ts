import { ChainId, PROVIDERS } from './constants'

export const checkChainId = (chainId: ChainId) => {

    switch (chainId) {
        case ChainId.MAINNET:
            return PROVIDERS.MAINENT;

        case ChainId.RINKEBY:
            return PROVIDERS.RINKEBY;

        default: return PROVIDERS.LOCALHOST;
    }

}