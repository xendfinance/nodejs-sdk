import ABIS from "../strategies/abis";
import createContract from "../strategies/create.contract";

const getPricePerFullShare = async (
	provider: string,
	contractAddress: string,) => {
	try {
		const contract = await createContract(provider, ABIS.PROTOCOL_ADAPTER, contractAddress)
		return await contract.methods.GetPricePerFullShare().call();
	} catch (e) {
		console.error(e)
		return 0;
	}
}


export default getPricePerFullShare;