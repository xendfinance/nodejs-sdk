import createContract from "../create.contract";
import web3 from "web3";
import privateKeyToAddress from "../../utils/privateKeyToAddress";
import ABIS from "../abis";




export default async function (provider: string, privateKey: string, address: Addresses) {


  try {

    //
    const clientAddress = privateKeyToAddress(provider, privateKey);

    const contract = await createContract(provider, ABIS.CLIENT_RECORD, address.CLIENT_RECORD);

    //get the number of record
    const record = await contract.methods.getClientRecordByAddress(clientAddress).call();

    let shareBalance = record.derivativeBalance

    let initiaDerivativeBalance = web3.utils.fromWei(shareBalance.toString(), "ether");


    const lendingServiceContract = await createContract(provider, ABIS.PROTOCOL_ADAPTER, address.PROTOCOL_ADAPTER);

    let pricePerFullShare = await lendingServiceContract.methods.GetPricePerFullShare().call();

    pricePerFullShare = web3.utils.fromWei(pricePerFullShare.toString(), "ether");

    let balance = pricePerFullShare * Number(initiaDerivativeBalance);

    if (record) {

      return { balance, derivativeWithdrawn: record.derivativeTotalWithdrawn, shareBalance }
    }
    else {
      return { balance: 0.00, derivativeWithdrawn: 0.00, shareBalance: 0.00 }

    }

  } catch (err) {

    console.error(err);
    return {}

  }

}