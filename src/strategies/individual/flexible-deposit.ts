import { Addresses } from '../../types';
import createContract from "../create.contract";
import web3 from 'web3';
import DAITokenAbi from '../abis/DaiContract.json';
import sendSignedTransaction from '../../utils/sendSignedTransaction';
import ABIS from "../abis";


export default async function (provider: string,
  privateKey: string, depositAmount: string, addresses: Addresses) {


  //
  try {

    const contract = await createContract(provider, ABIS.PERSONAL, addresses.PERSONAL);

    const tokenContract = await createContract(provider, DAITokenAbi, addresses.TOKEN);

    depositAmount = web3.utils.toWei(depositAmount, 'ether'); // convert to big number

    // there has to be some way of granting permission for transaction
    const approvalData = await tokenContract.methods.approve(addresses.PERSONAL, depositAmount)

    await sendSignedTransaction(privateKey, provider, approvalData, addresses.TOKEN)



    const data = await contract.methods.deposit()
    const receipt = await sendSignedTransaction(privateKey, provider, data, addresses.PERSONAL);


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