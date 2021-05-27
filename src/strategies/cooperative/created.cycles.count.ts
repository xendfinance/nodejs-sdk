
import createContract from '../create.contract';
import Cycles from '../abis/Cycles.json';
import privateKeyToAddress from '../../utils/privateKeyToAddress';


export default async function (provider: string, privateKey: string, addresses: Addresses) {

  try {
    const contract = await createContract(provider, Cycles, addresses.CYCLES)

    const clientAddress = privateKeyToAddress(provider, privateKey);

    let cyclesCount = await contract.methods.getRecordIndexLengthForCycleMembersByDepositor(clientAddress).call();

    return Number(cyclesCount);

  } catch (err) {
    console.log(err)
    return 0;
  }
}