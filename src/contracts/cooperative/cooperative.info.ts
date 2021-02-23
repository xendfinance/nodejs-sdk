
import createContract from "../create.contract";
import Cycles from '../abis/Cycles.json';
import { COOPERATIVE } from '../addresses/localhost';

export default async function (cycleId: number, provider: string) {
  try {

    const contract = await createContract(provider, Cycles.abi, COOPERATIVE.CYCLES);

    const data = await contract.methods.getCycleInfoById(cycleId).call();

    return data

  } catch (error) {
    return {}
  }
}