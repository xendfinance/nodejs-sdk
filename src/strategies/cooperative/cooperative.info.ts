
import { Addresses } from '../../types';
import createContract from "../create.contract";
import Cycles from '../abis/Cycles.json';

export default async function (cycleId: number, provider: string, addresses: Addresses) {
  try {

    const contract = await createContract(provider, Cycles, addresses.CYCLES);

    const data = await contract.methods.getCycleInfoById(cycleId).call();

    return data

  } catch (error) {
    return {}
  }
}