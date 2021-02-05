import Web3 from 'web3';
import serializedSignedTransaction from "../../utils/serializedSignedTransaction";
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


    let signedTx = serializedSignedTransaction(data, ESUSU.ESUSU_SERVICE, privateKey)

    let web3 = new Web3(provider);
    let sdf = await web3.eth.sendSignedTransaction('0x' + signedTx.toString('hex')).on('receipt', (receipt: any) => {
      console.log(receipt, ' receipt')
    });

    console.log(sdf, ' the one the returned')

    return {}

  } catch (error) {
    console.error(error);
    return {}
  }

}