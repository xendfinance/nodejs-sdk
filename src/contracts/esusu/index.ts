import { ChainId } from "../../utils/constants";
import { checkChainId } from "../../utils/helpers";
import createEsusu from './create.esusu';
import createdCyclesCount from "./created.cycles.count";
import esusuId from "./esusu.id";
import esusuInfo from "./esusu.info";

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

  // retrieve the number of cycles the account with the initialized private key has created
  async getCreatedCyclesCount() {
    return createdCyclesCount(this.provider, this.privateKey);
  }

  // get the id of an esusu cycle by passing the position of the cycle in the list of cycles created by a particular client address
  async getCycleIdFromCreatedCyclesList(positionOfCycle: number) {
    return await esusuId(positionOfCycle, this.provider, this.privateKey);
  }

  async esusuInformation(esusuId: number) {
    return esusuInfo(esusuId, this.provider);
  }

}