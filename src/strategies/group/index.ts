import { ChainId } from '../../utils/constants';
import { checkChainId } from '../../utils/helpers';
import createGroup from './create.group';
import getGroup from './get.groups';
import getReward from './get.reward';

class Group {
  provider: string;
  privateKey: string;

  constructor(chainId: ChainId, privateKey: string) {
    this.provider = checkChainId(chainId);
    this.privateKey = privateKey;
  }

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
    });
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
    });
  }

  ///////////////////////////////////////////////////////////////////////

  /**
   * Get xend token rewards for a member
   * @param
   */

  async getXendTokenReward() {
    return await getReward(this.provider, this.privateKey);
  }
}

export default Group;
