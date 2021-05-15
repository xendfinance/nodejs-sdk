
import Groups from '../abis/Groups.json';
import privateKeyToAddress from "../../utils/privateKeyToAddress";
import createContract from "../create.contract";





export default async function (provider: string, privateKey: string, addresses: Addresses) {


  const clientAddress = privateKeyToAddress(provider, privateKey);

  try {

    //
    const contract = await createContract(provider, Groups, addresses.GROUPS);
    const data = await contract.methods.getXendTokensReward(clientAddress).call();

    return data;

  } catch (err) {

    console.error(err);
    return {}

  }

}