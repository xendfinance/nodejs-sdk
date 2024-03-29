import { Addresses } from '../../types';
import createContract from "../create.contract";
import sendSignedTransaction from '../../utils/sendSignedTransaction';
import ABIS from "../abis";


export default async function (privateKey: string, provider: string, amount: string, addresses: Addresses, protocol: string) {

  //
  try {

    let amt = protocol === 'Venus' ? Number(amount) * Math.pow(10, 8) : (Number(amount) * Math.pow(10, 18))

    const contract = await createContract(provider, ABIS.PERSONAL, addresses.PERSONAL);

    // add trun
    // amt = Math.trunc(amt) - to remove the decimal place

    const data = await contract.methods.withdraw(amt)

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