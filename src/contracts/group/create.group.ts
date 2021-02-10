
// import Web3 from 'web3';
import serializedSignedTransaction from "../../utils/sendSignedTransaction";
import createContract from "../create.contract";
import { ESUSU } from '../addresses/rinkeby';
import EsusuService from '../abis/EsusuService.json';


type Args = {
  privateKey: string
  provider: string
  groupName: string
  groupSymbol: string
}

/**
 * Create a group
 * Check if group exists before proceeding
 * @param args 
 */

export default async function (args: Args) {

  const { privateKey, provider, groupName, groupSymbol } = args;

  try {

    // create the data and encode abi
    const contract = await createContract(provider, EsusuService.abi, ESUSU.ESUSU_SERVICE);

    const data = await contract.methods.CreateGroup(groupName, groupSymbol).encodeABI();

    let signedTx = await serializedSignedTransaction(data, ESUSU.ESUSU_SERVICE, privateKey, provider)

    console.log(signedTx, ' the returnedj suff')

    return {
      status: true,
      msg: ""
    }

  } catch (error) {

    console.error(error);

    return {
      status: false,
      msg: ''
    }
  }

}