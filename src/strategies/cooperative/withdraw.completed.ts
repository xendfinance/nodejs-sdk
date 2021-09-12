import { Addresses } from '../../types';
import createContract from "../create.contract";
import XendFinanceGroup from '../abis/XendFinanceGroup.json';
import sendSignedTransaction from "../../utils/sendSignedTransaction";

export default async function (cycleId: number, provider: string, privateKey: string, addresses: Addresses) {

  try {

    const contract = await createContract(provider, XendFinanceGroup, addresses.COOPERATIVE);

    const data = await contract.methods.withdrawFromCycle(cycleId)

    const receipt = await sendSignedTransaction(privateKey, provider, data, addresses.COOPERATIVE)


    return {
      status: true,
      data: receipt
    }

  } catch (error) {
    console.error(error);
    return {
      status: false,
      data: error
    }
  }
}