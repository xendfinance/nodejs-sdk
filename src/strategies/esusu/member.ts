import privateKeyToAddress from '../../utils/privateKeyToAddress';
import EsusuStorage from '../abis/EsusuStorage.json';
import { ESUSU } from "../addresses/localhost"
import createContract from "../create.contract"


export default async function (
  cycleId: number,
  privateKey: string,
  provider: string
) {

  try {
    const clientAddress = privateKeyToAddress(provider, privateKey);

    const contract = await createContract(provider, EsusuStorage.abi, ESUSU.ESUSU_STORAGE);


    const isMember = contract.methods.IsMemberInCycle(clientAddress, cycleId).call();

    return Boolean(isMember);

  } catch (error) {

    console.error(error);
    return false;

  }
}