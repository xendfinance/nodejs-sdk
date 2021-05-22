
import createContract from "../create.contract";
import Abi from '../abis/Groups.json';
import privateKeyToAddress from "../../utils/privateKeyToAddress";
import sendSignedTransaction from "../../utils/sendSignedTransaction";


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
    const contract = await createContract(provider, Abi, addresses.GROUPS);

    const client = await privateKeyToAddress(provider, privateKey);

    const data = await contract.methods.createGroup(groupName, groupSymbol, client)
    const signedTx = await sendSignedTransaction(privateKey, provider, data, addresses.GROUPS)

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