import createContract from "../create.contract";
import EsusuService from '../abis/EsusuService.json';
import DAITokenAbi from '../abis/DaiContract.json';
import sendSignedTransaction from '../../utils/sendSignedTransaction';
import privateKeyToAddress from "../../utils/privateKeyToAddress";
import esusuInfo from './info';


export default async function (
  cycleId: number,
  provider: string,
  privateKey: string, addresses: Addresses) {

  try {

    const contract = await createContract(provider, EsusuService, addresses.ESUSU_SERVICE);

    const tokenContract = await createContract(provider, DAITokenAbi, addresses.TOKEN);

    const clientAddress = privateKeyToAddress(provider, privateKey);





    // get the esusu with the cycleID passed to this function.
    // the esusu cycle amount is needed to approve the transaction
    const esusu_cycle = await esusuInfo(cycleId, provider, addresses);



    // there has to be some way of granting permission for transaction
    const approvalData = await tokenContract.methods.approve(addresses.ESUSU_ADAPTER, esusu_cycle.DepositAmount).encodeABI();


    await sendSignedTransaction(approvalData, addresses.TOKEN, privateKey, provider);



    const data = await contract.methods.JoinEsusu(cycleId, clientAddress).encodeABI();


    const signedTx = await sendSignedTransaction(data, addresses.ESUSU_SERVICE, privateKey, provider);


    return {
      status: true,
      data: signedTx
    };


  } catch (error) {
    console.error(error);
    return {
      status: false,
      data: error
    }
  }
}