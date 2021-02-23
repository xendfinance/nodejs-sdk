import { ChainId } from "../../utils/constants";
import { checkChainId } from "../../utils/helpers";
import createCooperative from "./create.cooperative";

type CooperativeCycleData = {
  groupId: number
  cycleStakeAmount: any
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

      /**
   * Create an cooperative cycle cycle
   * @param args 
   */

  async createCooperative(args: CooperativeCycleData) {
    return await createCooperative({
      ...args,
      payoutIntevalSeconds: args.payoutIntervalInSeconds,
      privateKey: this.privateKey,
      provider: this.provider
    })
  }


}