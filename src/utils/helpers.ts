import { ChainId, PROVIDERS } from './constants'

export const checkChainId = (chainId: ChainId) => {


    let provider = "";

    if (chainId === ChainId.MAINNET) {
        provider = PROVIDERS.MAINENT
    }
    if (chainId === ChainId.ROPSTEN) {
        provider = PROVIDERS.ROPSTEN
    }
    if (chainId === ChainId.RINKEBY) {
        provider = PROVIDERS.RINKEBY
    }
    if (chainId === null) {
        provider = PROVIDERS.LOCALHOST
    } else {
        provider = PROVIDERS.LOCALHOST
    }

    return provider;

}