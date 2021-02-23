import createContract from "../create.contract";
import XendFinanceGroup from '../abis/XendFinanceGroup.json';
import DAITokenAbi from '../abis/DaiContract.json';
import { COOPERATIVE } from '../addresses/localhost';
import sendSignedTransaction from '../../utils/sendSignedTransaction';
import cooperativeInfo from './cooperative.info';


export default async function (
  cycleId: number,
  numberOfStakes: number,
  provider: string,
  privateKey: string) {

  try {

    const contract = await createContract(provider, XendFinanceGroup, COOPERATIVE.YEARN_GROUP);

    const tokenContract = await createContract(provider, DAITokenAbi, COOPERATIVE.YEARN_GROUP);

    // get the cooperative with the cycleID passed to this function.
    // the cooperative cycle amount is needed to approve the transaction
    const cooperative_cycle = await cooperativeInfo(cycleId, provider);
    
    const cycleStakeAmount = cooperative_cycle.cycleStakeAmount;

    const depositAmount = cycleStakeAmount * numberOfStakes;


    // there has to be some way of granting permission for transaction
    const approvalData = await tokenContract.methods.approve(COOPERATIVE.YEARN_GROUP, depositAmount).encodeABI();


    await sendSignedTransaction(approvalData, COOPERATIVE.DAI_TOKEN, privateKey, provider);



    const data = await contract.methods.joinCycle(cycleId, numberOfStakes).encodeABI();


    const signedTx = await sendSignedTransaction(data, COOPERATIVE.YEARN_GROUP, privateKey, provider);


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