import { Addresses } from '../../types';
import createGroup from './create.group';
import getGroup from './get.group';
import { getEsusuGroups as getGroups } from './groups';
import getReward from './get.reward';




class Group {


  privateKey: string
  provider: string
  addresses: Addresses

  constructor(provider: string, privateKey: string, addresses: Addresses) {
    this.provider = provider;
    this.privateKey = privateKey;
    this.addresses = addresses;
  }




  /////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Create Group
   * @param groupName
   * @param groupSymbol
   */
  async create(groupName: string, groupSymbol: string) {
    return await createGroup({
      privateKey: this.privateKey,
      provider: this.provider,
      groupName,
      groupSymbol,
    }, this.addresses);
  }




  ///////////////////////////////////////////////////////////////////////

  /**
   * Get back a groups information using the group's ID
   * @param groupId
   */

  async getGroup(groupId: number) {
    return await getGroup({
      provider: this.provider,
      groupId,
    }, this.addresses);
  }




  async getGroups() {
    return await getGroups(this.provider, this.privateKey, this.addresses);
  }




  ///////////////////////////////////////////////////////////////////////

  /**
   * Get xend token rewards for a member
   * @param
   */

  async getXendTokenReward() {
    return await getReward(this.provider, this.privateKey, this.addresses);
  }
}

export default Group;
