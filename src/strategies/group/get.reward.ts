
import { ESUSU } from "../addresses/localhost";
import Groups from '../abis/Groups.json';
import privateKeyToAddress from "../../utils/privateKeyToAddress";
import createContract from "../create.contract";





export default async function (provider:string, privateKey:string) {


    const clientAddress = privateKeyToAddress(provider, privateKey);

  try {

    //
    const contract = await createContract(provider, Groups.abi, ESUSU.GROUPS);
    const data = await contract.methods.getXendTokensReward(clientAddress).call();

    return data;

  } catch (err) {

    console.error(err);
    return {}

  }

}