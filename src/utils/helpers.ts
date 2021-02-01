import { ChainId, PROVIDERS } from './constants'

export const checkChainId = (chainId: ChainId) => {

    let provider;

    if (chainId === 1) {
        provider = PROVIDERS.MAINENT
    }
    if (chainId === 3) {
        provider = PROVIDERS.ROPSTEN
    }
    if (chainId === 4) {
        provider = PROVIDERS.RINKEBY
    }
    if (chainId === null) {
        provider = PROVIDERS.LOCALHOST
    } else {
        provider = PROVIDERS.LOCALHOST
    }

    return provider;

}