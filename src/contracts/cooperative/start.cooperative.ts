import { COOPERATIVE } from "../addresses/localhost"
import createContract from "../create.contract"
import XendFinanceGroup from '../abis/XendFinanceGroup.json';
import sendSignedTransaction from "../../utils/sendSignedTransaction";

export default async function start(cycleId: number, provider: string, privateKey: string) {
  try {

    const contract = await createContract(provider, XendFinanceGroup, COOPERATIVE.YEARN_GROUP);

    const data = await contract.methods.activateCycle(cycleId).encodeABI();

    const signedTx = await sendSignedTransaction(data, COOPERATIVE.YEARN_GROUP, privateKey, provider)

    return {
      status: true,
      msg: 'cycle has started successfully',
      data: signedTx
    }

  } catch (error) {
    console.error(error)
    return {
      status: false,
      msg: 'cycle was not started',
      data: error
    }
  }
}