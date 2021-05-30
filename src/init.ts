import getBalance from "./utils/balance";
import { ChainId } from "./utils/constants";
import { checkChainId } from "./utils/helpers";
import protocolSelector from "./utils/protocol-selector";
import { CreateWallet, RetrieveWallet } from "./utils/web3";
import privateKeyToAddress from "./utils/privateKeyToAddress";



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


  getClientAddress(){
    return privateKeyToAddress(this.provider, this.privateKey);
  }


  // get current apy of the active protocol
  async apys() {
    if(this.chainId === ChainId.BSC_MAINNET){
      
      return new Promise((resolve) => {

        const url = "https://api.xend.finance/xend-finance/apys";

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';


        xhr.onreadystatechange = () => {
          if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.response){
              resolve(xhr.response.data)
            }
          }        }

        xhr.open('GET', url);
        xhr.send()
        
      })


    } else Error('can only get apy for mainnet')
  }


}




export default XendFinance;