import { ChainId } from "../../utils/constants"
import { checkChainId } from "../../utils/helpers";
import createGroup from "./create.group";


const privateKey = 'fd0c10d724f6ccca84650a28ba8235e2e1a89a5240a5d5bc8ca25a688ecfc417';

class Group {

  provider: string;

  constructor(chainId: ChainId) {
    this.provider = checkChainId(chainId);
  }

  /**
   * Create Group
   * @param groupName 
   * @param groupSymbol 
   */
  createGroup(groupName: string, groupSymbol: string) {
    return createGroup({
      privateKey,
      provider: this.provider,
      groupName,
      groupSymbol
    })
  }

}

export default Group;