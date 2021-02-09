import { ChainId } from "../../utils/constants"
import { checkChainId } from "../../utils/helpers";
import createGroup from "./create.group";
import getGroup from "./get.groups";



class Group {

  provider: string;
  privateKey: string;

  constructor(chainId: ChainId, privateKey: string) {
    this.provider = checkChainId(chainId);
    this.privateKey = privateKey;
  }

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
      groupSymbol
    })
  }

  async getGroup(groupId: number) {
    return await getGroup({
      provider: this.provider,
      groupId
    })
  }

}

export default Group;