import { Addresses } from '../../types';
import createContract from "../create.contract";
import sendSignedTransaction from '../../utils/sendSignedTransaction';
import ABIS from "../abis";



export default async function (privateKey: string, provider: string, recordId: number, addresses: Addresses) {

  //
  try {

    const contract = await createContract(provider, ABIS.PERSONAL, addresses.PERSONAL);

    const data = await contract.methods.WithdrawFromFixedDeposit(recordId)

    const receipt = await sendSignedTransaction(privateKey, provider, data, addresses.PERSONAL)


    return {
      status: true,
      data: receipt
    }

  } catch (error) {
    return {
      status: false,
      data: error
    }
  }
}