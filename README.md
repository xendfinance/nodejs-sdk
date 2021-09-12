
# XendFinance SDK

Build applications on-top of the Xend Finance smart contracts.

<!-- ![GitHub contributors](https://img.shields.io/github/contributors/xendfinance/XendFinanceSDK?color=orange&style=flat-square) -->


# Installation
Using npm:
```bash
npm install @xend-finance/web-sdk
```
Using yarn:
```bash
yarn add @xend-finance/web-sdk
```

Xend Finance has different saving strategies that helps you save your money in stable currencies;
- Personal Savings
- Esusu
- Cooperative Savings

You can make use of one or all of these strategies

# Scenario
You can use Xend Finance in as many scenario's you can come up with, but there are 2 examples
1. Use one general address for all your transactions
2. Create a new address for each of your users and use for their transactions

# Example

```js
import XF from '@xend-finance/web-sdk';


const makeDeposit = async () => {
  const { Personal } = await XF(chainId, privateKey, { env:"mainnet" });

  const depositAmount = "100";

  const response = await Personal.flexibleDeposit(depositAmount);

  return response;
}
```



# Parameters
These parameters are used to create an instance of any of the saving strategies exported from the SDK

Name | Description
--- | ---
**chainId** | Chain ID of the network in use
**privateKey** | Private key of address
**options** | *Optional*



# Options
When any of Xend Finance strategy is initialized without *options*, the SDK defaults to use the addresses for the testnet.

Properties | Values | Description
--- | --- | ---
`env` | local, testnet, mainnet | Required 
`protocols` | Array of protocols objects | This can only be used when the `env` is `local`. 
`protocolName` | | Used in the case of multiple protocols available

Note: whenever you use the *options* argument you have to provide value for the `env` property even if it is "testnet"


# Protocol Type
This is the structure of a protocol to be used by the SDK and will be helpful when using the SDK on your local machine with an instance of tools like ganache.

```json
{
  "name":"",
  "code":"",
  "addresses": {
    "PROTOCOL_ADAPTER": "",
    "PROTOCOL_SERVICE": "",
    "GROUPS": "",
    "CYCLES": "",
    "ESUSU_SERVICE": "",
    "ESUSU_STORAGE": "",
    "ESUSU_ADAPTER": "",
    "COOPERATIVE": "",
    "PERSONAL": "",
    "CLIENT_RECORD": "",
    "XEND_TOKEN": "",
    "TOKEN": "",
    "PROTOCOL_CURRENCY": "",
  }
}
```

# Some Available Methods
## General
Name | Parameters | Description
--- | --- | ---
`getClientAddress` | | address of account used to initialize SDK
`apys` | | will only return values if you are on mainnet


## Personal Savings
Name | Parameters | Description
--- | --- | ---
`flexibleDeposit` | depositAmount | 
`fixedDeposit` | | 
`fixedInfo` | | 
`flexibleInfo` | | 
`withdrawFixed` | recordId | 
`withdrawFlexible` | amount |
`walletBalance` | |

## Esusu
Name | Parameters | Description
--- | --- | ---
`create` | |
`walletBalance` | |

## Cooperative Savings
Name | Parameters | Description
--- | --- | ---
`create` | |
`walletBalance` | |
