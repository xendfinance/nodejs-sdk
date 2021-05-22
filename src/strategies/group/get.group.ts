
import EsusuAdpter from '../abis/EsusuAdapter.json';
import createContract from "../create.contract";


type Args = {
  provider: string
  groupId: number
}


export default async function (args: Args, addresses: Addresses) {

  let { provider, groupId } = args;

  try {

    //
    const contract = await createContract(provider, EsusuAdpter, addresses.ESUSU_ADAPTER);
    const data = await contract.methods.GetGroupInformationById(groupId).call();

    return data;

  } catch (err) {

    console.error(err);
    return {}

  }

}