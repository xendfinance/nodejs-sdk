import createContract from "../create.contract";
import EsusuService from '../abis/EsusuService.json';
import DAITokenAbi from '../abis/DaiContract.json';
import { ESUSU } from '../addresses/localhost';
import sendSignedTransaction from '../../utils/sendSignedTransaction';
import privateKeyToAddress from "../../utils/privateKeyToAddress";
import esusuInfo from './esusu.info';
import member from "./member";

export default async function (
  cycleId: number,
  provider: string,
  privateKey: string) {

  try {

    const contract = await createContract(provider, EsusuService.abi, ESUSU.ESUSU_SERVICE);

    const tokenContract = await createContract(provider, DAITokenAbi, ESUSU.DAI_TOKEN);

    const clientAddress = privateKeyToAddress(provider, privateKey);





    // check if client is already a member of this esusu cycle
    const isMember = await member(cycleId, privateKey, provider);
    if (isMember) {
      throw new Error(`client already a member of cycle with id - ${cycleId}`);
    }






    // get the esusu with the cycleID passed to this function.
    // the esusu cycle amount is needed to approve the transaction
    const esusu_cycle = await esusuInfo(cycleId, provider);
    console.log(esusu_cycle, 'cycle')



    // there has to be some way of granting permission for transaction
    const approvalData = await tokenContract.methods.approve(ESUSU.ESUSU_ADAPTER, esusu_cycle.DepositAmount).encodeABI();


    await sendSignedTransaction(approvalData, ESUSU.DAI_TOKEN, privateKey, provider);



    const data = await contract.methods.JoinEsusu(cycleId, clientAddress).encodeABI();


    const signedTx = await sendSignedTransaction(data, ESUSU.ESUSU_SERVICE, privateKey, provider);


    return signedTx;


  } catch (error) {
    console.error(error);
    return {
      status: false
    }
  }
}