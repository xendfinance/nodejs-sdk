
import createContract from "../create.contract";
import EsusuService from '../abis/EsusuService.json';
import { ESUSU } from '../addresses/localhost';

export default async function (esusuId: number, provider: string) {
  try {

    const contract = await createContract(provider, EsusuService.abi, ESUSU.ESUSU_SERVICE);

    const data = await contract.methods.GetEsusuCycle(esusuId).call();

    return data

  } catch (error) {
    return {}
  }
}