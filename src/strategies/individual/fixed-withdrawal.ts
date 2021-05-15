import createContract from "../create.contract";
import XendFinanceIndividual from '../abis/XendFinanceIndividual_Yearn_V1.json';
import sendSignedTransaction from '../../utils/sendSignedTransaction';



export default async function (privateKey: string, provider: string, recordId: number, addresses: Addresses) {

  //
  try {

    const contract = await createContract(provider, XendFinanceIndividual.abi, addresses.PERSONAL);

    const fixedDepositInfo = await createContract(provider, XendFinanceIndividual.abi, addresses.CLIENT_RECORD);

    const info = fixedDepositInfo.methods.GetRecordById(recordId);

    let amount: string = info.amount;

    const data = await contract.methods.WithdrawFromFixedDeposit(recordId, amount).encodeABI();

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