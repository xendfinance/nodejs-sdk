import getBalance from "./utils/balance";
import { ChainId } from "./utils/constants";
import { checkChainId, capitalizeFirstLetter, getAddressByName } from "./utils/helpers";
import protocolSelector from "./utils/protocol-selector";
import { CreateWallet, RetrieveWallet } from "./utils/web3";

import axios from 'axios';


const defaultInitOptions: Options = {
  env: "testnet"
}


class XendFinance {

  options: Options;
  chainId: ChainId
  privateKey: string
  provider: string

  protocol: string
  availableProtocols: any[]
  addresses: Addresses
  currency: string
  shareCurrency: string

  constructor(chainId: ChainId, privateKey: string, options: Options = defaultInitOptions) {
    this.options = options;
    this.chainId = chainId
    this.privateKey = privateKey;
    let { url, currency } = checkChainId(chainId);
    this.provider = url;
    this.currency = currency;

    this.init();
  }

  init(protocols: Protocols[] = []) {
    let { name, addresses, available } = protocolSelector(this.options, protocols);
    this.protocol = name;
    this.addresses = addresses;
    this.shareCurrency = addresses.PROTOCOL_CURRENCY;
    this.availableProtocols = available;
  }

  async initProtocol() {
    if (this.options.env !== "mainnet") {
      return;
    }
     
    const result = await axios.get("https://api.xend.finance/xend-finance/addresses");
    const data = result.data.data;

    const protocols: Protocols[] = [];

    if (data && data.length > 0) {
      for (const item of data) {
        const protocol: Protocols = {
          name: capitalizeFirstLetter(item.protocol_name),
          code: item.protocol_name,
          addresses: {
            PROTOCOL_ADAPTER: getAddressByName(item.addresses, "protocol_adapter"),
            PROTOCOL_SERVICE: getAddressByName(item.addresses, "protocol_service"),
            GROUPS: getAddressByName(item.addresses, "groups"),
            CYCLES: getAddressByName(item.addresses, "cycles"),
            ESUSU_SERVICE: getAddressByName(item.addresses, "esusu_service"),
            ESUSU_STORAGE: getAddressByName(item.addresses, "esusu_storage"),
            ESUSU_ADAPTER: getAddressByName(item.addresses, "esusu_adapter"),
            COOPERATIVE: getAddressByName(item.addresses, "cooperative"),
            PERSONAL: getAddressByName(item.addresses, "individual"),
            CLIENT_RECORD: getAddressByName(item.addresses, "client_record"),
            XEND_TOKEN: getAddressByName(item.addresses, "xend_token"),
            TOKEN: getAddressByName(item.addresses, "token"),
            PROTOCOL_CURRENCY: item.protocol_name.charAt(0) + "busd"
          }
        };
        protocols.push(protocol);
      }
    }

    this.init(protocols);
  }

  async ifd() { return 'sdf' }

  async createWallet() {
    return await CreateWallet(this.chainId);
  }

  async retrieveWallet() {
    return await RetrieveWallet(this.chainId, this.privateKey);
  };


  async walletBalance() {
    return await getBalance(this.provider, this.privateKey, this.addresses);
  };


  // get current apy of the active protocol
  async apys() {
    if (this.chainId === ChainId.BSC_MAINNET) {

      return new Promise((resolve) => {

        const url = "https://api.xend.finance/xend-finance/apys";

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';


        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.response) {
              resolve(xhr.response.data)
            }
          }
        }

        xhr.open('GET', url);
        xhr.send()

      })


    } else Error('can only get apy for mainnet')
  }


  openSdk() {
    let md = document.createElement('div');
    md.id = "xend-finance-web-sdk-ui";
    md.style.display = "flex";
    md.style.height = "100%";
    md.style.justifyContent = "center";
    md.style.alignItems = "center";

    let modal = document.createElement('section');

    let mstyles = {
      width: "100%",
      height: "100vh",
      maxWidth: "320px",
      maxHeight: "600px",
      margin: "0 auto",
      backgroundColor: "#FFFFFF",
    }

    let iframe = document.createElement('iframe');
    iframe.src = "https://bsc.xend.finance";
    let framestyles = {
      boxSizing: "border-box",
      border: "none",
      height: "100%",
      width: "100%",
      margin: "0",
      padding: "0",
      scrollbarWidth: "5px",
      scrollbarColor: "pink",
    }
    Object.assign(iframe.style, framestyles)

    let close = document.createElement("button");
    close.onclick = () => document.getElementById("root").removeChild(md)
    close.innerHTML = "close";

    modal.appendChild(close)

    modal.appendChild(iframe);

    Object.assign(modal.style, mstyles);
    md.appendChild(modal);

    document.getElementById("root").appendChild(md);
  }


}




export default XendFinance;