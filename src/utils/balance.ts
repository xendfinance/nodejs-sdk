import * as Types from '../types';
import Web3 from "web3";
import ABIS from "../strategies/abis"
import createContract from "../strategies/create.contract"
import privateKeyToAddress from "./privateKeyToAddress"


const getBalance = async (provider: string, privateKey: string, addresses: Types.Addresses) => {
    try {

        const client = privateKeyToAddress(provider, privateKey);
        const contract = await createContract(provider, ABIS.TOKEN, addresses.TOKEN)

        const value = await contract.methods.balanceOf(client).call();

        return Web3.utils.fromWei(value, 'ether');

    } catch (e) {
        console.error(e)
        return "0";
    }
}


export default getBalance;