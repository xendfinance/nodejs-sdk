
import { Transaction } from 'ethereumjs-tx';


export default function (data: any, contractAddress: string, privateKey: string) {

  let pk = Buffer.from(privateKey, 'hex');

  let rawTx = {
    nonce: '0x00',
    gasPrice: '0x09184e72a000',
    gasLimit: '0x1',
    to: contractAddress,
    value: '0x00',
    data
  }


  let transaction = new Transaction(rawTx);

  transaction.sign(pk);

  let serializedTransaction = transaction.serialize();

  return serializedTransaction;


}