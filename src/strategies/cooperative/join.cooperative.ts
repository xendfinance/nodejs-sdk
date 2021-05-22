import createContract from "../create.contract";
import XendFinanceGroup from '../abis/XendFinanceGroup.json';
import DAITokenAbi from '../abis/DaiContract.json';
import sendSignedTransaction from '../../utils/sendSignedTransaction';
import cooperativeInfo from './cooperative.info';


export default async function (
  cycleId: number,
  numberOfStakes: number,
  provider: string,
  privateKey: string, addresses: Addresses) {

  try {

    const contract = await createContract(provider, XendFinanceGroup, addresses.COOPERATIVE);

    const tokenContract = await createContract(provider, DAITokenAbi, addresses.COOPERATIVE);

    // get the cooperative with the cycleID passed to this function.
    // the cooperative cycle amount is needed to approve the transaction
    const cooperative_cycle = await cooperativeInfo(cycleId, provider, addresses);

    const cycleStakeAmount = cooperative_cycle.cycleStakeAmount;

    const depositAmount = cycleStakeAmount * numberOfStakes;


    // there has to be some way of granting permission for transaction
    const approvalData = await tokenContract.methods.approve(addresses.COOPERATIVE, depositAmount);


    await sendSignedTransaction(privateKey, provider, approvalData, addresses.COOPERATIVE);



    const data = await contract.methods.joinCycle(cycleId, numberOfStakes)


    const receipt = await sendSignedTransaction(privateKey, provider, data, addresses.COOPERATIVE);


    return {
      status: true,
      data: receipt
    };


  } catch (error) {
    console.error(error);
    return {
      status: false,
      data: error
    }
  }
}