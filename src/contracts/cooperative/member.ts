import privateKeyToAddress from '../../utils/privateKeyToAddress';
import Cycles from '../abis/Cycles.json';
import { COOPERATIVE } from "../addresses/localhost"
import createContract from "../create.contract"


export default async function (cycleId: number, privateKey: string, provider: string) {
  try {
    const clientAddress = privateKeyToAddress(provider, privateKey);

    const contract = await createContract(provider, Cycles.abi, COOPERATIVE.CYCLES);


    const memberExist = contract.methods.doesCycleMemberExist(cycleId, clientAddress).call();

    return Boolean(memberExist);

  } catch (error) {
    console.error(error)
    return false;
  }
}