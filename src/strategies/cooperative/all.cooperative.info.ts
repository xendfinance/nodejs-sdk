import Cycles from '../abis/Cycles.json';
import { COOPERATIVE } from "../addresses/localhost"
import createContract from "../create.contract"


export default async function (provider: string) {
  try {

    const contract = await createContract(provider, Cycles.abi, COOPERATIVE.CYCLES);


    const cycles = contract.methods.getCycles().call();

    return cycles;

  } catch (error) {
    console.error(error)
    return false;
  }
}