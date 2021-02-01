import { ChainId } from "./utils/constants";
import { CreateWallet, RetrieveWallet } from "./utils/web3";

class XendFinance {

  // chain id is used to help know which network to connect to
  chainId: ChainId

  privateKey: string

  //
  constructor(chainId: ChainId, privateKey: string) {
    this.chainId = chainId
    this.privateKey = privateKey
  }

  async createWallet() {
    return await CreateWallet(this.chainId);
  }

  async retrieveWallet() {
    return await RetrieveWallet(this.chainId, this.privateKey);
  }

  esusu() {
    // will return an object of esusu functions
  }

}



export default XendFinance;