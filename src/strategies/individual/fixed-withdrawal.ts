import createContract from "../create.contract";
import sendSignedTransaction from '../../utils/sendSignedTransaction';
import ABIS from "../abis";



export default async function (privateKey: string, provider: string, recordId: number, addresses: Addresses) {

  //
  try {

    const contract = await createContract(provider, ABIS.PERSONAL, addresses.PERSONAL);

    const fixedDepositInfo = await createContract(provider, ABIS.CLIENT_RECORD, addresses.CLIENT_RECORD);

    const info = fixedDepositInfo.methods.GetRecordById(recordId);

    let amount: string = info.amount;

    const data = await contract.methods.WithdrawFromFixedDeposit(recordId, amount)

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