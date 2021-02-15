import { ESUSU } from "../addresses/localhost"
import createContract from "../create.contract"
import EsusuService from '../abis/EsusuService.json';
import sendSignedTransaction from "../../utils/sendSignedTransaction";

export default async function start(cycleId: number, provider: string, privateKey: string) {
  try {

    const contract = await createContract(provider, EsusuService.abi, ESUSU.ESUSU_SERVICE);

    const data = await contract.methods.StartEsusuCycle(cycleId).encodeABI();

    const signedTx = await sendSignedTransaction(data, ESUSU.ESUSU_SERVICE, privateKey, provider)

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