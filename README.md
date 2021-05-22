![GitHub contributors](https://img.shields.io/github/contributors/xendfinance/XendFinanceSDK?color=orange&style=flat-square)

# XendFinance SDK

Build applications on-top of the Xend Finance smart contracts.



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
import { Personal } from 'xend-finance';

const instance = new Personal(chainId, privateKey, options);

const makeDeposit = async () => {
  const depositAmount = "100";

  const response = await instance.flexibleDeposit(depositAmount);

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
`env` | local, test, live | Required 
`protocols` | Array of protocols objects | This can only be used when the `env` is `local`. 
`protocolName` | | Used in the case of multiple protocols available


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

# Some available functions
## Personal Savings
Name | Parameters | Description
--- | --- | ---
`flexibleDeposit` | depositAmount | 
`fixedDeposit` | | 
`fixedInfo` | | 
`flexibleInfo` | | 
`withdrawFixed` | recordId | 
`withdrawFlexible` | amount |

## Esusu
Name | Parameters | Description
--- | --- | ---
`create` | |

## Cooperative Savings
Name | Parameters | Description
--- | --- | ---
`create` | |


# Using Ganache
Using Ganache to use local deployment of Xend Finance strategies

1. Run a fork of the mainnet on ganache
2. Deploy the Xend Finance strategy contracts and get deployed addresses
3. Send Token to the addresses you will use to run operations
4. Begin calling SDK functions


## You must be running a fork of the mainnet on ganache-cli 

## replace the mainnet addresses in ./src/addresses/localhost.ts

```bash
yarn
yarn test
```
<!-- 
This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`. -->

## Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

### Jest

Jest tests are set up to run with `npm test` or `yarn test`.

### Bundle Analysis

[`size-limit`](https://github.com/ai/size-limit) is set up to calculate the real cost of your library with `npm run size` and visualize the bundle with `npm run analyze`.

#### Setup Files

This is the folder structure

```txt
/src
  index.tsx       
/test
  blah.test.tsx   
.gitignore
package.json
README.md         
tsconfig.json
```

### Rollup

TSDX uses [Rollup](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings. See [Optimizations](#optimizations) for details.

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

## Continuous Integration

### GitHub Actions

Two actions are added by default:

- `main` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix
- `size` which comments cost comparison of your library on every pull request using [`size-limit`](https://github.com/ai/size-limit)

## Optimizations

Please see the main `tsdx` [optimizations docs](https://github.com/palmerhq/tsdx#optimizations). In particular, know that you can take advantage of development-only optimizations:

```js
// ./types/index.d.ts
declare var __DEV__: boolean;

// inside your code...
if (__DEV__) {
  console.log('foo');
}
```

You can also choose to install and use [invariant](https://github.com/palmerhq/tsdx#invariant) and [warning](https://github.com/palmerhq/tsdx#warning) functions.

## Module Formats

CJS, ESModules, and UMD module formats are supported.

The appropriate paths are configured in `package.json` and `dist/index.js` accordingly. Please report if any issues are found.


## Publishing to NPM

We recommend using [np](https://github.com/sindresorhus/np).
