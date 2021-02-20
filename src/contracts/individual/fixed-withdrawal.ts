import createContract from "../create.contract";
import XendFinanceIndividual from '../abis/XendFinanceIndividual_Yearn_V1.json';
import { INDIVIDUAL_SAVINGS } from '../addresses/localhost';
import sendSignedTransaction from '../../utils/sendSignedTransaction';



export default async function (privateKey: string, provider: string, recordId: number) {

  //
  try {

    const contract = await createContract(provider, XendFinanceIndividual.abi, INDIVIDUAL_SAVINGS.INDIVIDUAL_CONTRACT);

    const fixedDepositInfo = await createContract(provider, XendFinanceIndividual.abi, INDIVIDUAL_SAVINGS.CLIENT_RECORD);

    const info = fixedDepositInfo.methods.GetRecordById(recordId);

    let amount : string = info.amount;

    let lockPeriod : number = info.lockPeriodInSeconds;

    let depositDate : number = info.depositDateInSeconds;

    const data = await contract.methods.WithdrawFromFixedDeposit(recordId, amount, lockPeriod, depositDate).encodeABI();

    const signedTx = await sendSignedTransaction(data, INDIVIDUAL_SAVINGS.INDIVIDUAL_CONTRACT, privateKey, provider);

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