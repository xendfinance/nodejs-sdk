import createContract from "../create.contract";
import web3 from 'web3';
import XendFinanceIndividual from '../abis/XendFinanceIndividual_Yearn_V1.json';
import DAITokenAbi from '../abis/DaiContract.json';
import sendSignedTransaction from '../../utils/sendSignedTransaction';

type FixedDeposit = {
  provider: string
  privateKey: string
  depositAmount: any
  depositDate: number
  lockPeriod: number
}

export default async function (args: FixedDeposit, addresses: Addresses) {

  let { provider, privateKey, depositAmount, depositDate, lockPeriod } = args

  //
  try {

    const contract = await createContract(provider, XendFinanceIndividual.abi, addresses.PERSONAL);

    const tokenContract = await createContract(provider, DAITokenAbi, addresses.TOKEN);

    depositAmount = web3.utils.toWei(depositAmount, 'ether'); // convert to big number

    // there has to be some way of granting permission for transaction
    const approvalData = await tokenContract.methods.approve(addresses.PERSONAL, depositAmount).encodeABI();


    await sendSignedTransaction(approvalData, addresses.PERSONAL, privateKey, provider);

    const data = await contract.methods.FixedDeposit(depositDate, lockPeriod).encodeABI();

    const signedTx = await sendSignedTransaction(data, addresses.PERSONAL, privateKey, provider);

    return {
      status: true,
      data: signedTx
    }

  } catch (error) {
    return {
      status: false,
      data: error
    }
  }
}