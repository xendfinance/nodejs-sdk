import web3 from 'web3';
import createContract from "../create.contract";
import EsusuService from '../abis/EsusuService.json';
import serializedSignedTransaction from "../../utils/sendSignedTransaction";

type EsusuCycle = {
  provider: string
  privateKey: string
  groupId: number
  depositAmount: any
  payoutIntevalSeconds: number
  startTimeInSeconds: number
  maxMembers: number
}

export default async function (args: EsusuCycle, addresses: Addresses) {

  let { privateKey, provider, groupId, depositAmount, payoutIntevalSeconds, startTimeInSeconds, maxMembers } = args;

  //
  try {

    const contract = await createContract(provider, EsusuService, addresses.ESUSU_SERVICE);

    depositAmount = web3.utils.toWei(depositAmount, 'ether'); // convert to big number

    const data = await contract.methods.CreateEsusu(groupId, depositAmount, payoutIntevalSeconds, startTimeInSeconds, maxMembers).encodeABI();

    const signedTx = await serializedSignedTransaction(data, addresses.ESUSU_SERVICE, privateKey, provider);

    return signedTx;

  } catch (err) {
    console.error(err);
    return {}
  }
}