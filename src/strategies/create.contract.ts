
import web3 from 'web3';
/**
 * A contract object is used to make calls to functions on the blockchain.
 * This method creates and returns a contract object using web3
 * @param provider
 * @param abi 
 * @param contractAddress 
 */
export default function (provider: string, abi: Array<any>, contractAddress: string) {
  const __web3__ = new web3(provider);
  return new __web3__.eth.Contract(abi, contractAddress);
}