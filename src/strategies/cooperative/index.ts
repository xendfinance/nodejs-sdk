import { Addresses, Options, CooperativeCycleData } from '../../types';
import createCooperative from './create.cooperative';
import cooperativeInfo from './cooperative.info';
import joinCooperative from './join.cooperative';
import doesMemberExist from './member';
import start from './start.cooperative';
import withdrawOngoing from './withdraw.ongoing';
import withdrawCompleted from './withdraw.completed';
import { createCooperativeGroup } from './group';
import { getEsusuGroups as getGroups } from '../group/groups';
import { contributions, cyclesInGroup } from './cooperatives';


export default class Cooperative {


  options: Options;
  privateKey: string
  provider: string

  protocol: string
  addresses: Addresses

  constructor(provider: string, privateKey: string, options: Options, addresses: Addresses, protocol: string) {
    this.provider = provider;
    this.privateKey = privateKey;
    this.options = options;
    this.addresses = addresses;
    this.protocol = protocol;
  }



  /**
   * Create an cooperative cycle cycle
   * @param args
   */

  async create(args: CooperativeCycleData) {
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

  async join(cycleId: number, numberOfStakes: number) {
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

  async info(cycleId: number) {
    return await cooperativeInfo(cycleId, this.provider, this.addresses);
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

  async start(cycleId: number) {
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

  async withdrawCapital(cycleId: number) {
    return await withdrawCompleted(cycleId, this.provider, this.privateKey, this.addresses);
  }




  // create Cooperative Groups
  async createGroup(name: string, symbol: string) {
    return await createCooperativeGroup(name, symbol, this.provider, this.privateKey, this.addresses)
  }



  // get cooperative Groups
  async groups() {
    return await getGroups(this.provider, this.privateKey, this.addresses)
  }


  async contributions() {
    return await contributions(this.provider, this.privateKey, this.addresses)
  }


  async cyclesInGroup(groupId: string) {
    return await cyclesInGroup(groupId, this.provider, this.addresses)
  }



}
