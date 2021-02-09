
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
    console.log(privateKey, ' the one provided')
    this.privateKey = 'fd0c10d724f6ccca84650a28ba8235e2e1a89a5240a5d5bc8ca25a688ecfc417'
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