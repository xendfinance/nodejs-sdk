import createContract from "../create.contract"
import XendFinanceGroup from '../abis/XendFinanceGroup.json';
import sendSignedTransaction from "../../utils/sendSignedTransaction";

export default async function start(cycleId: number, provider: string, privateKey: string, addresses: Addresses) {
  try {

    const contract = await createContract(provider, XendFinanceGroup, addresses.COOPERATIVE);

    const data = await contract.methods.activateCycle(cycleId)

    const receipt = await sendSignedTransaction(privateKey, provider, data, addresses.COOPERATIVE)


    return {
      status: true,
      msg: 'cycle has started successfully',
      data: receipt
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