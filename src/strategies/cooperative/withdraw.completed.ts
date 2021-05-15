import createContract from "../create.contract";
import XendFinanceGroup from '../abis/XendFinanceGroup.json';
import sendSignedTransaction from "../../utils/sendSignedTransaction";

export default async function (cycleId: number, provider: string, privateKey: string, addresses: Addresses) {

  try {

    const contract = await createContract(provider, XendFinanceGroup, addresses.COOPERATIVE);

    const data = await contract.methods.withdrawFromCycle(cycleId).encodeABI();

    const signedTx = await sendSignedTransaction(data, addresses.COOPERATIVE, privateKey, provider);

    return {
      status: true,
      data: signedTx
    }

  } catch (error) {
    console.error(error);
    return {
      status: false,
      data: error
    }
  }
}