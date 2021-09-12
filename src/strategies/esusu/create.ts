import { Addresses } from '../../types';
import web3 from 'web3';
import createContract from "../create.contract";
import sendSignedTransaction from "../../utils/sendSignedTransaction";
import ABIS from '../abis';

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

    const contract = await createContract(provider, ABIS.ESUSU_SERVICE, addresses.ESUSU_SERVICE);

    depositAmount = web3.utils.toWei(depositAmount, 'ether'); // convert to big number

    const data = await contract.methods.CreateEsusu(groupId, depositAmount, payoutIntevalSeconds, startTimeInSeconds, maxMembers)

    const receipt = await sendSignedTransaction(privateKey, provider, data, addresses.ESUSU_SERVICE)


    return receipt;

  } catch (err) {
    console.error(err);
    return {}
  }
}