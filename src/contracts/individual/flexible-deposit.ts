import createContract from "../create.contract";
import web3 from 'web3';
import XendFinanceIndividual from '../abis/XendFinanceIndividual_Yearn_V1.json';
import { INDIVIDUAL_SAVINGS } from '../addresses/localhost';
import DAITokenAbi from '../abis/DaiContract.json';
import sendSignedTransaction from '../../utils/sendSignedTransaction';


export default async function (  provider: string,
    privateKey: string, depositAmount: any) {


  //
  try {

    const contract = await createContract(provider, XendFinanceIndividual.abi, INDIVIDUAL_SAVINGS.INDIVIDUAL_CONTRACT);

    const tokenContract = await createContract(provider, DAITokenAbi, INDIVIDUAL_SAVINGS.DAI_CONTRACT);

    depositAmount = web3.utils.toWei(depositAmount, 'ether'); // convert to big number

    // there has to be some way of granting permission for transaction
    const approvalData = await tokenContract.methods.approve(INDIVIDUAL_SAVINGS.INDIVIDUAL_CONTRACT, depositAmount).encodeABI();


    await sendSignedTransaction(approvalData, INDIVIDUAL_SAVINGS.INDIVIDUAL_CONTRACT, privateKey, provider);

    const data = await contract.methods.deposit().encodeABI();

    const signedTx = await sendSignedTransaction(data, INDIVIDUAL_SAVINGS.INDIVIDUAL_CONTRACT, privateKey, provider);

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