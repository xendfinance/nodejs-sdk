import createContract from "../create.contract";
import EsusuService from '../abis/EsusuService.json';
import { ESUSU } from '../addresses/rinkeby';
import sendSignedTransaction from '../../utils/sendSignedTransaction';
import privateKeyToAddress from "../../utils/privateKeyToAddress";

export default async function (
  cycleId: number,
  provider: string,
  privateKey: string) {

  try {

    const contract = await createContract(provider, EsusuService.abi, ESUSU.ESUSU_SERVICE);

    const clientAddress = privateKeyToAddress(provider, privateKey);



    // there has to be some way of granting permission for transaction



    const data = await contract.methods.JoinEsusu(cycleId, clientAddress).encodeABI();

    const signedTx = await sendSignedTransaction(data, ESUSU.ESUSU_SERVICE, privateKey, provider);

    return signedTx;

  } catch (error) {
    console.error(error);
    return {
      status: false
    }
  }
}