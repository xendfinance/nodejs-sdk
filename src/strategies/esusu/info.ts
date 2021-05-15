
import createContract from "../create.contract";
import EsusuService from '../abis/EsusuService.json';

export default async function (esusuId: number, provider: string, addresses: Addresses) {
  try {

    const contract = await createContract(provider, EsusuService, addresses.ESUSU_SERVICE);

    const data = await contract.methods.GetEsusuCycle(esusuId).call();

    return data

  } catch (error) {
    return {}
  }
}