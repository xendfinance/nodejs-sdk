import privateKeyToAddress from '../../utils/privateKeyToAddress';
import EsusuStorage from '../abis/EsusuStorage.json';
import createContract from "../create.contract"


export default async function (
  cycleId: number,
  privateKey: string,
  provider: string,
  addresses: Addresses
) {

  try {
    const clientAddress = privateKeyToAddress(provider, privateKey);

    const contract = await createContract(provider, EsusuStorage, addresses.ESUSU_STORAGE);


    const isMember = contract.methods.IsMemberInCycle(clientAddress, cycleId).call();

    return Boolean(isMember);

  } catch (error) {

    console.error(error);
    return false;

  }
}