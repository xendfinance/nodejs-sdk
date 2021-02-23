import web3 from 'web3';
import createContract from "../create.contract";
import XendFinanceGroupsAbi from '../abis/new.json';
import { COOPERATIVE } from '../addresses/localhost';
import serializedSignedTransaction from "../../utils/sendSignedTransaction";

type CooperativeCycle = {
  provider: string
  privateKey: string
  groupId: number
  cycleStakeAmount: any
  payoutIntevalSeconds: number
  startTimeInSeconds: number
  maxMembers: number
}

export default async function (args: CooperativeCycle) {

  let { privateKey, provider, groupId, cycleStakeAmount, payoutIntevalSeconds, startTimeInSeconds, maxMembers } = args;

  //
  try {

    const contract = await createContract(provider, XendFinanceGroupsAbi, COOPERATIVE.YEARN_GROUP);

    cycleStakeAmount = web3.utils.toWei(cycleStakeAmount, 'ether'); // convert to big number

    const data = await contract.methods.createCycle(groupId, startTimeInSeconds, payoutIntevalSeconds, maxMembers, false, cycleStakeAmount).encodeABI();

    const signedTx = await serializedSignedTransaction(data, COOPERATIVE.YEARN_GROUP, privateKey, provider);

    return signedTx;

  } catch (err) {
    console.error(err);
    return {}
  }
}