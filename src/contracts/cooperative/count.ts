
import createContract from '../create.contract';
import Cyles from '../abis/Cycles.json';
import { COOPERATIVE } from '../addresses/localhost';
import privateKeyToAddress from '../../utils/privateKeyToAddress';


export default async function (provider: string, privateKey: string) {

  try {
    const contract = await createContract(provider, Cyles.abi, COOPERATIVE.CYCLES)

    const clientAddress = privateKeyToAddress(provider, privateKey);

    let cyclesCount = await contract.methods.getCyclesLength(clientAddress).call();

    return Number(cyclesCount);

  } catch (err) {
    console.log(err)
    return 0;
  }
}