
import createContract from '../create.contract';
import Cyles from '../abis/Cycles.json';
import privateKeyToAddress from '../../utils/privateKeyToAddress';


export default async function (provider: string, privateKey: string, addresses: Addresses) {

  try {
    const contract = await createContract(provider, Cyles.abi, addresses.CYCLES)

    const clientAddress = privateKeyToAddress(provider, privateKey);

    let cyclesCount = await contract.methods.getCyclesLength(clientAddress).call();

    return Number(cyclesCount);

  } catch (err) {
    console.log(err)
    return 0;
  }
}