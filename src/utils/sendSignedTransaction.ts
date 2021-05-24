import Web3 from 'web3';
import privateKeyToAddress from './privateKeyToAddress';



export default async (privateKey: string, provider: string, tx: any, contractAddress: string) => {

  const web3 = new Web3(provider);
  const client = privateKeyToAddress(provider, privateKey);
  const networkId = await web3.eth.net.getId();
  const gas = await tx.estimateGas({ from: client })
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI()
  const nonce = await web3.eth.getTransactionCount(client)

  const signedTx = await web3.eth.accounts.signTransaction({
    to: contractAddress,
    data,
    gas, gasPrice, nonce, chainId: networkId
  }, privateKey)

  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  return receipt;
}