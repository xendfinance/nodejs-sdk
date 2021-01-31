import { ChainId } from "./utils/constants";
import { CreateWallet } from "./utils/web3";

class XendFinance {

  // chain id is used to help know which network to connect to
  chainId: ChainId

  //
  constructor(chainId: ChainId) {
    this.chainId = chainId
  }

  async createWallet() {
    return await CreateWallet(this.chainId);
  }

  esusu() {
    // will return an object of esusu functions
  }

}



export default XendFinance;