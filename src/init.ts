import getBalance from "./utils/balance";
import { ChainId } from "./utils/constants";
import { checkChainId } from "./utils/helpers";
import protocolSelector from "./utils/protocol-selector";
import { CreateWallet, RetrieveWallet } from "./utils/web3";



const defaultInitOptions: Options = {
  env: "testnet"
}


class XendFinance {

  chainId: ChainId
  privateKey: string
  provider: string

  protocol: string
  availableProtocols: any[]
  addresses: Addresses
  currency: string
  shareCurrency: string


  constructor(chainId: ChainId, privateKey: string, options: Options = defaultInitOptions) {
    this.chainId = chainId
    this.privateKey = privateKey;
    let { url, currency } = checkChainId(chainId);
    this.provider = url;

    let { name, addresses, available } = protocolSelector(options);
    this.protocol = name;
    this.addresses = addresses;
    this.shareCurrency = addresses.PROTOCOL_CURRENCY
    this.currency = currency;
    this.availableProtocols = available;
  }


  async createWallet() {
    return await CreateWallet(this.chainId);
  }

  async retrieveWallet() {
    return await RetrieveWallet(this.chainId, this.privateKey);
  }


  async walletBalance() {
    return getBalance(this.provider, this.privateKey, this.addresses)
  }


  // get current apy of the active protocol
  // async apy() { }


}




export default XendFinance;