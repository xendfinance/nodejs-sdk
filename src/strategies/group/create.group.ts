
import serializedSignedTransaction from "../../utils/sendSignedTransaction";
import createContract from "../create.contract";
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

export default async function (args: Args, addresses: Addresses) {

  const { privateKey, provider, groupName, groupSymbol } = args;

  try {

    // create the data and encode abi
    const contract = await createContract(provider, EsusuService, addresses.ESUSU_SERVICE);

    const data = await contract.methods.CreateGroup(groupName, groupSymbol).encodeABI();

    let signedTx = await serializedSignedTransaction(data, addresses.ESUSU_SERVICE, privateKey, provider)

    return {
      status: true,
      msg: "",
      data: signedTx
    }

  } catch (error) {

    console.error(error);

    return {
      status: false,
      msg: '',
      data: error
    }
  }

}