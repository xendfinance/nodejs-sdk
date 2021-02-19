import { Transaction } from 'ethereumjs-tx';
//import Common from 'ethereumjs-common';
import Web3 from 'web3';

export default async function (
  data: any,
  contractAddress: string,
  privateKey: string,
  provider: string
) {

  let pk = Buffer.from(privateKey, 'hex');
  let web3 = new Web3(provider);

  let account = await web3.eth.accounts.privateKeyToAccount(privateKey);

  let nonce = (await web3.eth.getTransactionCount(account.address));

  let gas = await web3.eth.estimateGas({
    from: account.address,
    nonce: nonce,
    to: contractAddress,
    data: data,
  });

  // const customCommon = Common.forCustomChain(
  //   'mainnet',
  //   {
  //     name: 'mainnet',
  //     networkId: 1,
  //     chainId: 1,
  //   },
  //   'petersburg'
  // );

  let rawTx = {
    nonce: nonce,
    gasLimit: gas,
    gasPrice: web3.utils.toHex(30000000000), //2 gwei,
    to: contractAddress,
    value: '0x00',
    data,
  };

  let transaction = new Transaction(rawTx);

  transaction.sign(pk);

  let serializedTransaction = transaction.serialize();

  return new Promise((resolve, reject) => {
    web3.eth.sendSignedTransaction('0x' + serializedTransaction.toString("hex"))
      .once('receipt', resolve)
      .catch(reject)
  })

}
