import createContract from "../create.contract";
import EsusuStorage from '../abis/EsusuStorage.json';
import { ESUSU } from '../addresses/localhost';
import privateKeyToAddress from "../../utils/privateKeyToAddress";



export default async function (position: number, provider: string, privateKey: string) {
  try {

    const contract = await createContract(provider, EsusuStorage.abi, ESUSU.ESUSU_STORAGE);

    const clientAddress = privateKeyToAddress(provider, privateKey);

    const esusuId = await contract.methods.GetCycleIdFromCycleIndexAndCycleCreator(position, clientAddress).call();

    return Number(esusuId);

  } catch (error) {
    console.error(error)
    return 0;
  }
}