import Cycles from '../abis/Cycles.json';
import createContract from "../create.contract"


export default async function (provider: string, addresses: Addresses) {
  try {

    const contract = await createContract(provider, Cycles.abi, addresses.CYCLES);


    const cycles = contract.methods.getCycles().call();

    return cycles;

  } catch (error) {
    console.error(error)
    return false;
  }
}