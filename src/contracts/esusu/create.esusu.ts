import Web3 from 'web3';
import createContract from "../create.contract";
import EsusuService from '../abis/EsusuService.json';
import { ESUSU } from '../addresses/rinkeby';
import serializedSignedTransaction from "../../utils/serializedSignedTransaction";

type EsusuCycle = {
  provider: string
  privateKey: string
  groupId: number
  depositAmount: number
  payoutIntevalSeconds: number
  startTimeInSeconds: number
  maxMembers: number
}

export default async function (args: EsusuCycle) {

  let { privateKey, provider, groupId, depositAmount, payoutIntevalSeconds, startTimeInSeconds, maxMembers } = args;

  //
  try {

    const contract = await createContract(provider, EsusuService.abi, ESUSU.ESUSU_SERVICE);

    const data = await contract.methods.CreateEsusu(groupId, depositAmount, payoutIntevalSeconds, startTimeInSeconds, maxMembers).encodeABI();

    const signedTx = await serializedSignedTransaction(data, ESUSU.ESUSU_SERVICE, privateKey, provider);

    let web3 = new Web3(provider);
    await web3.eth.sendSignedTransaction('0x' + signedTx.toString('hex')).on('receipt', console.log);

    return {}

  } catch (err) {
    console.error(err);
    return {}
  }
}