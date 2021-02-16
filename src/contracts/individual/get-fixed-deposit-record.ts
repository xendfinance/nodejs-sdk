import createContract from "../create.contract";
import XendFinanceIndividual from '../abis/XendFinanceIndividual_Yearn_V1.json';
import { INDIVIDUAL_SAVINGS } from '../addresses/localhost';
import privateKeyToAddress from "../../utils/privateKeyToAddress";




export default async function (provider: string, privateKey: string) {

  
  try {

    //
    const clientAddress = privateKeyToAddress(provider, privateKey);
    
    const contract = await createContract(provider, XendFinanceIndividual.abi, INDIVIDUAL_SAVINGS.CLIENT_RECORD);
    
    //get the number of record
    const individualDepositRecordLength = await contract.methods.GetRecordIndexFromDepositor(clientAddress).call();
    
    const count = Number(individualDepositRecordLength);

    const data: Array<any> = [];

    for (let start = 0; start < count; start++) {
    
    let position = start + 1;

    // get a particular record ID
    const recordId = await contract.methods.GetRecordIdFromRecordIndexAndDepositorRecord(position, clientAddress).call();

    //get basic information about the deposit record
    const info = await contract.methods.GetRecordById(recordId).call();

    data.push(info);

    }

    return data;

  } catch (err) {

    console.error(err);
    return {}

  }

}