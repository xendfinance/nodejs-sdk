import { Addresses, Options, EsusuCycleData } from '../../types';
import createEsusu from './create';
import createdCyclesCount, { interest } from "./created.cycles.count";
import { createEsusuGroups, getEsusuGroups } from "../group/groups";
import esusuId from "./esusu.id";
import esusuInfo, { esusuCyclesInAGroup } from "./info";
import joinEsusu from "./join";
import member from "./member";
import start from "./start";
import withdrawCapital from "./withdraw.capital";
import withdrawInterest from "./withdraw.interest";
import { esusuContributions, numberOfContributions } from "./contributions";








export default class Esusu {

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


  //////////////////////////////////////////////////////////////////////


  /**
   * Create an Esusu cycle
   * @param args 
   */

  async create(args: EsusuCycleData) {
    return await createEsusu({
      ...args,
      payoutIntevalSeconds: args.payoutIntervalInSeconds,
      privateKey: this.privateKey,
      provider: this.provider
    }, this.addresses)
  }



  //////////////////////////////////////////////////////////////////////


  /**
   * Retrieve the number of cycles the account with the initialized 
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

  async info(esusuId: number) {
    return await esusuInfo(
      esusuId,
      this.provider,
      this.addresses);
  }



  //////////////////////////////////////////////////////////////////////



  /**
   * Join an Esusu cycle
   * @param cycleId 
   */

  async join(cycleId: number) {
    return await joinEsusu(
      cycleId,
      this.provider,
      this.privateKey,
      this.addresses);
  }



  ////////////////////////////////////////////////////////////////////////////



  async start(cycleId: number) {
    return await start(
      cycleId,
      this.provider,
      this.privateKey,
      this.addresses);
  }




  //////////////////////////////////////////////////////////////////////////


  async withdrawInterest(cycleId: number) {
    return await withdrawInterest(
      cycleId,
      this.provider,
      this.privateKey,
      this.addresses)
  }




  //////////////////////////////////////////////////////////////////////////


  async withdrawCapital(cycleId: number) {
    return await withdrawCapital(
      cycleId,
      this.provider,
      this.privateKey,
      this.addresses);
  }






  //////////////////////////////////////////////////////////////////////


  async isMemberOfCycle(cycleId: number) {
    return member(
      cycleId,
      this.privateKey,
      this.provider,
      this.addresses);
  }


  //////////////////////////////////////////////////////////

  async roiAndCapital(cycleId: number) {

    return await interest(
      cycleId,
      this.provider,
      this.privateKey,
      this.addresses);

  }



  // Create a Group for Esusu cycles
  /////////////////////////////
  async createGroup(name: string, symbol: string) {
    return await createEsusuGroups(name, symbol, this.provider, this.privateKey, this.addresses);
  }


  async getGroups() {
    return await getEsusuGroups(this.provider, this.privateKey, this.addresses)
  }




  async contributionsCount() {
    return await numberOfContributions(this.provider, this.privateKey, this.addresses);
  }


  async contrubution() {
    return await esusuContributions(this.provider, this.privateKey, this.addresses)
  }



  async cyclesInGroup(groupId: number) {
    return await esusuCyclesInAGroup(groupId, this.provider, this.addresses);
  }


}