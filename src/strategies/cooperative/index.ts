import createCooperative from './create.cooperative';
import cooperativeInfo from './cooperative.info';
import joinCooperative from './join.cooperative';
import allCycles from './all.cooperative.info';
import doesMemberExist from './member';
import start from './start.cooperative';
import withdrawOngoing from './withdraw.ongoing';
import withdrawCompleted from './withdraw.completed';
import XendFinance from '../../init';


export default class Esusu extends XendFinance {

  /**
   * Create an cooperative cycle cycle
   * @param args
   */

  async createCooperative(args: CooperativeCycleData) {
    return await createCooperative({
      ...args,
      payoutIntevalSeconds: args.payoutIntervalInSeconds,
      privateKey: this.privateKey,
      provider: this.provider,
    }, this.addresses);
  }

  /**
   * joins a cooperative cycle
   * @param args
   */

  async joinCooperative(cycleId: number, numberOfStakes: number) {
    return await joinCooperative(
      cycleId,
      numberOfStakes,
      this.privateKey,
      this.provider,
      this.addresses
    );
  }

  /**
   * gets a cooperative cycle information by id
   * @param args
   */

  async cooperativeCycleInformation(cycleId: number) {
    return await cooperativeInfo(cycleId, this.provider, this.addresses);
  }

  /**
   * gets all cooperative cycle
   * @param args
   */

  async getAllCycles() {
    return await allCycles(this.provider, this.addresses);
  }

  /**
   * Check if the cycle memeber exist
   * @param cycleId
   */

  async doesCycleMemberExist(cycleId: number) {
    return await doesMemberExist(cycleId, this.privateKey, this.provider, this.addresses);
  }

  /**
 * Check if the cycle memeber exist
 * @param cycleId
 */

  async startCooperativeCycle(cycleId: number) {
    return await start(cycleId, this.privateKey, this.provider, this.addresses);
  }

  /**
   * withdraw from ongoing cycle
   * @param cycle id
   */

  async withdrawFromOngoingCycle(cycleId: number) {
    return await withdrawOngoing(cycleId, this.provider, this.privateKey, this.addresses);
  }

  /**
  * withdraw from completed cycle
  * @param cycle id
  */

  async withdrawFromCompletedCycle(cycleId: number) {
    return await withdrawCompleted(cycleId, this.provider, this.privateKey, this.addresses);
  }
}
