import Web3 from 'web3';
import privateKeyToAddress from './privateKeyToAddress';



const sendSignedNativeTransaction = async (
  privateKey: string,
  provider: string,
  tx: any,
  contractAddress: string,
  depositAmount:any) => {
 
  const web3 = new Web3(provider);
 
  const client = privateKeyToAddress(provider, privateKey);
  
  const networkId = await web3.eth.net.getId();
  
  const nonce = await web3.eth.getTransactionCount(client)
  
  const gas = (await tx.estimateGas({ from: client, nonce, value: depositAmount } ));
 
  const gasPrice = await web3.eth.getGasPrice();
  
  const data = tx.encodeABI()
  

  const signedTx = await web3.eth.accounts.signTransaction({
    to: contractAddress,
    value:depositAmount,
    data,
    gas,
    gasPrice,
    nonce,
    chainId: networkId
  }, privateKey)

  // @ts-ignore
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  return receipt;
}


export default sendSignedNativeTransaction;