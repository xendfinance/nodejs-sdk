import { ChainId } from "../../utils/constants";
import { checkChainId } from "../../utils/helpers";
import createEsusu from './create.esusu';

type EsusuCycleData = {
  groupId: number
  depositAmount: number
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



  async createEsusu(args: EsusuCycleData) {
    return await createEsusu({
      ...args,
      payoutIntevalSeconds: args.payoutIntervalInSeconds,
      privateKey: this.privateKey,
      provider: this.provider
    })
  }

}