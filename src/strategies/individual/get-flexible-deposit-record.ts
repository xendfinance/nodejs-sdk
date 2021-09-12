import { Addresses } from '../../types';
import createContract from "../create.contract";
// import web3 from "web3";
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

    // let initiaDerivativeBalance = web3.utils.fromWei(shareBalance.toString(), "ether");


    const lendingServiceContract = await createContract(provider, ABIS.PROTOCOL_ADAPTER, address.PROTOCOL_ADAPTER);

    let pricePerFullShare = await lendingServiceContract.methods.GetPricePerFullShare().call();

    // pricePerFullShare = web3.utils.fromWei(pricePerFullShare.toString(), "ether");

    // @ts-ignore
    let balance = ((Number(pricePerFullShare) * Number(shareBalance)) / Number(BigInt(1e18).toLocaleString('fullwide', { useGrouping: false })));

    if (record) {

      return { balance: toFixed(balance), derivativeWithdrawn: record.derivativeTotalWithdrawn, shareBalance }
    }
    else {
      return { balance: 0.00, derivativeWithdrawn: 0.00, shareBalance: 0.00 }

    }

  } catch (err) {

    console.error(err);
    return {}

  }

}


function toFixed(x: any) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += (new Array(e + 1)).join('0');
    }
  }
  return x;
}