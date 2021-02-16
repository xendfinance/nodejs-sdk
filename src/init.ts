
import { ChainId } from "./utils/constants";
import { CreateWallet, RetrieveWallet } from "./utils/web3";

import Group from './contracts/group';
import Esusu from "./contracts/esusu";



class XendFinance {

  // chain id is used to help know which network to connect to
  chainId: ChainId
  privateKey: string

  group: Group

  esusu: Esusu

  //
  constructor(chainId: ChainId, privateKey: string) {
    this.chainId = chainId
    console.log(privateKey)
    this.privateKey = privateKey;
    this.group = new Group(chainId, this.privateKey);
    this.esusu = new Esusu(chainId, this.privateKey);
  }



  async createWallet() {
    return await CreateWallet(this.chainId);
  }

  async retrieveWallet() {
    return await RetrieveWallet(this.chainId, this.privateKey);
  }

}



export default XendFinance;