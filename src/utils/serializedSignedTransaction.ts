
import { Transaction } from 'ethereumjs-tx';
import Common from 'ethereumjs-common'
import Web3 from 'web3'

export default async function (data: any, contractAddress: string, privateKey: string, provider: string) {

  let pk = Buffer.from(privateKey, 'hex');

  /***
   * 
   *   i need a way to get the provider the user selected on initialization here.. so that i dont manually pass in the provider url
   * 
   * Also you have to specify a timeout for the transaction
   * 
*/
  let web3 = new Web3(provider);

  // let gas = await web3.eth.estimateGas({to:contractAddress, data:data})

  let account = await web3.eth.accounts.privateKeyToAccount(privateKey);

  let nonce = await web3.eth.getTransactionCount(account.address);

  const customCommon = Common.forCustomChain(
    'rinkeby',
    {
      name: 'rinkeby',
      networkId: 4,
      chainId: 4,
    },
    'petersburg',
  )

  let rawTx = {
    nonce: nonce,
    gasLimit: web3.utils.toHex(45000),
    gasPrice: web3.utils.toHex(20e9), // 10 Gwei
    to: contractAddress,
    value: '0x00',
    data
  }


  let transaction = new Transaction(rawTx, { common: customCommon });

  transaction.sign(pk);

  let serializedTransaction = transaction.serialize();

  return serializedTransaction;


}