
import createContract from '../create.contract';
import Cycles from '../abis/Cycles.json';
import { COOPERATIVE } from '../addresses/localhost';


export default async function (provider: string, privateKey: string) {

  try {
    const contract = await createContract(provider, Cycles.abi, COOPERATIVE.CYCLES)

    let cyclesCount = await contract.methods.getCyclesLength().call();

    return Number(cyclesCount);

  } catch (err) {
    console.log(err)
    return 0;
  }
}