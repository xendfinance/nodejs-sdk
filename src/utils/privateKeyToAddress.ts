
import Web3 from 'web3';

export default function (provider: string, privateKey: string) {
  const web3 = new Web3(provider);
  const account = web3.eth.accounts.privateKeyToAccount(privateKey)
  return account.address;
}