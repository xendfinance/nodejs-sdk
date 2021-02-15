import { ChainId, PROVIDERS } from './constants'

export const checkChainId = (chainId: ChainId) => {

    switch (chainId) {
        case ChainId.MAINNET:
            return PROVIDERS.LOCALHOST;

        case ChainId.RINKEBY:
            return PROVIDERS.RINKEBY;

        default: return PROVIDERS.LOCALHOST;
    }

}