
import { ChainId } from "./utils/constants";
import { CreateWallet, RetrieveWallet } from "./utils/web3";

import Group from './contracts/group';


class XendFinance {

  // chain id is used to help know which network to connect to
  chainId: ChainId
  group: Group

  //
  constructor(chainId: ChainId) {
    this.chainId = chainId
    this.group = new Group(chainId);
  }



  async createWallet() {
    return await CreateWallet(this.chainId);
  }

  async retrieveWallet(privateKey: string) {
    return await RetrieveWallet(this.chainId, privateKey);
  }

}



export default XendFinance;