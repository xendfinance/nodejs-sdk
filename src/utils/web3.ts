import Web3 from 'web3';
import { ChainId } from './constants'
import { checkChainId } from './helpers'

/** this functions creates a web3 instance and sets a provider */
export const InstantiateWeb3 = (provider: string) => {

    let web3 = new Web3(provider);

    return web3;
}


/**This function creates a wallet and returns an object with address and private key which the end user stores*/

export const CreateWallet = async (chainId: ChainId) => {

    let provider: string = checkChainId(chainId).url;

    let web3 = InstantiateWeb3(provider);

    const wallet = await web3.eth.accounts.create();

    return wallet;

}

/**This function creates a wallet and returns an object with address and private key which the end user stores*/

export const RetrieveWallet = async (chainId: ChainId, privateKey: string) => {

    let provider: string = checkChainId(chainId).url;

    let web3 = InstantiateWeb3(provider);

    const wallet = await web3.eth.accounts.privateKeyToAccount(privateKey);

    return wallet;

}