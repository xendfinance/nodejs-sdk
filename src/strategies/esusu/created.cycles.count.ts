
import createContract from '../create.contract';
import EsusuStorage from '../abis/EsusuStorage.json';
import { ESUSU } from '../addresses/localhost';
import privateKeyToAddress from '../../utils/privateKeyToAddress';


export default async function (provider: string, privateKey: string) {

  try {
    const contract = await createContract(provider, EsusuStorage.abi, ESUSU.ESUSU_STORAGE)

    const clientAddress = privateKeyToAddress(provider, privateKey);

    let cyclesCount = await contract.methods.GetCycleIndexFromCycleCreator(clientAddress).call();

    return Number(cyclesCount);

  } catch (err) {
    console.log(err)
    return 0;
  }
}