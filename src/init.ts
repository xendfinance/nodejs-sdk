import * as Types from './types';
import getBalance from "./utils/balance";
import { ChainId } from "./utils/constants";
import { checkChainId } from "./utils/helpers";
import protocolSelector from "./utils/protocol-selector";
import { CreateWallet, RetrieveWallet } from "./utils/web3";
import getPricePerFullShare from "./utils/pricePerFullShare";
import getMainnetProtocols from './utils/get-addresses';
import Personal from "./strategies/individual";
import Esusu from "./strategies/esusu";
import Cooperative from "./strategies/cooperative";
import Group from "./strategies/group";
import axios from "axios";


const defaultInitOptions: Types.Options = {
  env: "testnet"
}


class XendFinance {

  options: Types.Options;
  chainId: ChainId
  privateKey: string
  provider: string

  protocol: string
  availableProtocols: any[]
  addresses: Types.Addresses
  currency: string
  shareCurrency: string

  Group: Group
  Personal: Personal
  Esusu: Esusu
  Cooperative: Cooperative

  constructor(
    chainId: number,
    privateKey: string,
    options: Types.Options = defaultInitOptions
  ) {

    this.options = options;
    this.chainId = chainId
    this.privateKey = privateKey;
    let { url, currency } = checkChainId(chainId);
    this.provider = url;
    this.currency = currency;

    let { name, addresses, available } = protocolSelector(this.options);
    this.protocol = name;
    this.addresses = addresses;
    this.shareCurrency = addresses.PROTOCOL_CURRENCY;
    this.availableProtocols = available;

    this.Personal = new Personal(this.provider, this.privateKey, this.options, this.addresses, this.protocol)
    this.Esusu = new Esusu(this.provider, this.privateKey, this.options, this.addresses, this.protocol)
    this.Cooperative = new Cooperative(this.provider, this.privateKey, this.options, this.addresses, this.protocol)
    this.Group = new Group(this.provider, this.privateKey, this.addresses)

  }






  /**
   * 
   * @returns Account
   */
  async createWallet() {
    return await CreateWallet(this.chainId);
  }

  /**
   * 
   * @returns Wallet Public Address
   */
  async retrieveWallet() {
    return await RetrieveWallet(this.chainId, this.privateKey);
  };


  /**
   * 
   * @returns Wallet Balance
   */
  async walletBalance() {
    return await getBalance(this.provider, this.privateKey, this.addresses);
  };

  /**
   * 
   * @returns Price Per Full Share
   */
  async getPPFS() {
    return await getPricePerFullShare(this.provider, this.addresses.PROTOCOL_ADAPTER)
  }


  /**
   * 
   * @returns Current APY of Active Protocol
   */
  async apys() {
    if (this.chainId === ChainId.BSC_MAINNET) {

      const url = "https://api.xend.finance/xend-finance/apys";
      const res = await axios.get(url)
      return res.data.data;

    } else Error('can only get apy for mainnet')
  }





}


const initializeXendFinance = async (chainId: number, privateKey: string, options: Types.Options) => {
  //
  if (chainId === ChainId.BSC_MAINNET) {
    const protocols = await getMainnetProtocols(chainId);
    options.protocols = protocols;
  }

  const xendfinance = new XendFinance(chainId, privateKey, options)
  return xendfinance;
}



export default initializeXendFinance;
export { Types }