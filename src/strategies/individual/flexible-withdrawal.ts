import createContract from "../create.contract";
import web3 from 'web3';
import sendSignedTransaction from '../../utils/sendSignedTransaction';
import ABIS from "../abis";



export default async function (privateKey: string, provider: string, amount: string, addresses: Addresses) {

  //
  try {

    amount = web3.utils.toWei(amount, 'ether'); // convert to big number

    const contract = await createContract(provider, ABIS.PERSONAL, addresses.PERSONAL);

    const data = await contract.methods.withdraw(amount)

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