import XendFinance from "../../init";
import { ChainId } from "../../utils/constants";
import createEsusu from './create';
import createdCyclesCount from "./created.cycles.count";
import esusuId from "./esusu.id";
import esusuInfo from "./info";
import joinEsusu from "./join";
import member from "./member";
import start from "./start";
import withdrawCapital from "./withdraw.capital";
import withdrawInterest from "./withdraw.interest";





type EsusuCycleData = {
  groupId: number
  depositAmount: any
  payoutIntervalInSeconds: number
  startTimeInSeconds: number
  maxMembers: number
}



export default class Esusu extends XendFinance {


  constructor(chainId: ChainId, privateKey: string, options?: Options) {
    super(chainId, privateKey, options);
  }

  //////////////////////////////////////////////////////////////////////


  /**
   * Create an Esusu cycle
   * @param args 
   */

  async createEsusu(args: EsusuCycleData) {
    return await createEsusu({
      ...args,
      payoutIntevalSeconds: args.payoutIntervalInSeconds,
      privateKey: this.privateKey,
      provider: this.provider
    }, this.addresses)
  }



  //////////////////////////////////////////////////////////////////////


  /**
   * Get number of cycles an address creates
   * retrieve the number of cycles the account with the initialized 
   * private key has created
   */

  async getCreatedCyclesCount() {
    return await createdCyclesCount(this.provider, this.privateKey, this.addresses);
  }



  //////////////////////////////////////////////////////////////////////


  /**
   * Get cycle id
   * @param positionOfCycle 
   * get the id of an esusu cycle by passing the position of the cycle in 
   * the list of cycles created by a particular client address
   */

  async getCycleIdFromCreatedCyclesList(positionOfCycle: number) {
    return await esusuId(positionOfCycle, this.provider, this.privateKey, this.addresses);
  }



  //////////////////////////////////////////////////////////////////////


  /**
   * Get Esusu cycle information
   * @param esusuId 
   */

  async esusuInformation(esusuId: number) {
    return await esusuInfo(esusuId, this.provider, this.addresses);
  }



  //////////////////////////////////////////////////////////////////////



  /**
   * Join an Esusu cycle
   * @param cycleId 
   */

  async joinEsusu(cycleId: number) {
    return await joinEsusu(cycleId, this.provider, this.privateKey, this.addresses);
  }



  ////////////////////////////////////////////////////////////////////////////



  async start(cycleId: number) {
    return await start(cycleId, this.provider, this.privateKey, this.addresses);
  }




  //////////////////////////////////////////////////////////////////////////


  async withdrawInterest(cycleId: number) {
    return await withdrawInterest(cycleId, this.provider, this.privateKey, this.addresses)
  }




  //////////////////////////////////////////////////////////////////////////


  async withdrawCapital(cycleId: number) {
    return await withdrawCapital(cycleId, this.provider, this.privateKey, this.addresses);
  }






  //////////////////////////////////////////////////////////////////////


  async isMemberOfCycle(cycleId: number) {
    return member(cycleId, this.privateKey, this.provider, this.addresses);
  }


}