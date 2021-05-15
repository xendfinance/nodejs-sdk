import XendFinance from '../../init';
import createGroup from './create.group';
import getGroup from './get.groups';
import getReward from './get.reward';




class Group extends XendFinance {

  /////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Create Group
   * @param groupName
   * @param groupSymbol
   */
  async createGroup(groupName: string, groupSymbol: string) {
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
