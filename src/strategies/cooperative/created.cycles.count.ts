
import createContract from '../create.contract';
import Cycles from '../abis/Cycles.json';
import { COOPERATIVE } from '../addresses/localhost';
import privateKeyToAddress from '../../utils/privateKeyToAddress';


export default async function (provider: string, privateKey: string) {

  try {
    const contract = await createContract(provider, Cycles.abi, COOPERATIVE.CYCLES)

    const clientAddress = privateKeyToAddress(provider, privateKey);

    let cyclesCount = await contract.methods.getRecordIndexLengthForCycleMembersByDepositor(clientAddress).call();

    return Number(cyclesCount);

  } catch (err) {
    console.log(err)
    return 0;
  }
}