import { ChainId } from "../../utils/constants";
import { checkChainId } from "../../utils/helpers";
import createEsusu from './create';
import createdCyclesCount from "./created.cycles.count";
import esusuId from "./esusu.id";
import esusuInfo from "./info";
import joinEsusu from "./join";
import member from "./member";
import start from "./start";

type EsusuCycleData = {
  groupId: number
  depositAmount: any
  payoutIntervalInSeconds: number
  startTimeInSeconds: number
  maxMembers: number
}

export default class Esusu {

  provider: string;
  privateKey: string;

  constructor(chainId: ChainId, privateKey: string) {
    this.provider = checkChainId(chainId);
    this.privateKey = privateKey;
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
    })
  }



  //////////////////////////////////////////////////////////////////////


  /**
   * Get number of cycles an address creates
   * retrieve the number of cycles the account with the initialized 
   * private key has created
   */

  async getCreatedCyclesCount() {
    return await createdCyclesCount(this.provider, this.privateKey);
  }



  //////////////////////////////////////////////////////////////////////


  /**
   * Get cycle id
   * @param positionOfCycle 
   * get the id of an esusu cycle by passing the position of the cycle in 
   * the list of cycles created by a particular client address
   */

  async getCycleIdFromCreatedCyclesList(positionOfCycle: number) {
    return await esusuId(positionOfCycle, this.provider, this.privateKey);
  }



  //////////////////////////////////////////////////////////////////////


  /**
   * Get Esusu cycle information
   * @param esusuId 
   */

  async esusuInformation(esusuId: number) {
    return await esusuInfo(esusuId, this.provider);
  }



  //////////////////////////////////////////////////////////////////////



  /**
   * Join an Esusu cycle
   * @param cycleId 
   */

  async joinEsusu(cycleId: number) {
    return await joinEsusu(cycleId, this.provider, this.privateKey);
  }



  ////////////////////////////////////////////////////////////////////////////



  async start(cycleId: number) {
    return await start(cycleId, this.provider, this.privateKey);
  }






  //////////////////////////////////////////////////////////////////////


  async isMemberOfCycle(cycleId: number) {
    return member(cycleId, this.privateKey, this.provider);
  }


}