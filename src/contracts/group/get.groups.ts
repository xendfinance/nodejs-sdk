import Web3 from 'web3';
import { ESUSU } from "../addresses/rinkeby";
import EsusuAdpter from '../abis/EsusuAdapter.json';
import createContract from "../create.contract";
import serializedSignedTransaction from "../../utils/serializedSignedTransaction";


type Args = {
  privateKey: string
  provider: string
  groupId: number
}


export default async function (args: Args) {

  let { provider, privateKey, groupId } = args;

  try {
    //
    const contract = await createContract(provider, EsusuAdpter.abi, ESUSU.ESUSU_ADAPTER);
    const data = await contract.methods.GetGroupInformationById(groupId).encodeABI();
    const signedTx = await serializedSignedTransaction(data, ESUSU.ESUSU_ADAPTER, privateKey, provider)

    let web3 = new Web3(provider);
    await web3.eth.sendSignedTransaction('0x' + signedTx.toString('hex')).on('receipt', (receipt: any) => {
      console.log(receipt, ' receipt')
    });

    return {}

  } catch (err) {

    console.log(err);
    return {}

  }

}