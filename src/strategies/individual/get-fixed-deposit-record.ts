import { Addresses } from '../../types';
import createContract from "../create.contract";
import privateKeyToAddress from "../../utils/privateKeyToAddress";
import ABIS from "../abis";




export default async function (provider: string, privateKey: string, address: Addresses) {


  try {

    //
    const clientAddress = privateKeyToAddress(provider, privateKey);

    const contract = await createContract(provider, ABIS.CLIENT_RECORD, address.CLIENT_RECORD);

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
    return []

  }

}