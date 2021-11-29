import * as Types from '../types';
import { capitalizeFirstLetter, getAddressByName } from '../utils/helpers';
import axios from "axios";
// import ABIS from '../strategies/abis';
import layer2Assets from './layer2-assets';

const getMainnetAddresses = async () => {
	//
	const url = "https://api.xend.finance/xend-finance/addresses";
	const res = await axios.get(url)
	return res.data.data;
}




const bscMainnetAddresses = async () => {

	const data = await getMainnetAddresses();

	const protocols: Types.Protocols[] = [];

	if (data && Array.isArray(data)) {
		for (const item of data) {



			const protocol: Types.Protocols = {
				name: capitalizeFirstLetter(item.protocol_name),
				code: item.protocol_name,
				addresses: {
					PROTOCOL_ADAPTER: getAddressByName(item.addresses, "protocol_adapter"),
					PROTOCOL_SERVICE: getAddressByName(item.addresses, "protocol_service"),
					GROUPS: getAddressByName(item.addresses, "groups"),
					CYCLES: getAddressByName(item.addresses, "cycles"),
					ESUSU_SERVICE: getAddressByName(item.addresses, "esusu_service"),
					ESUSU_STORAGE: getAddressByName(item.addresses, "esusu_storage"),
					ESUSU_ADAPTER: getAddressByName(item.addresses, "esusu_adapter"),
					COOPERATIVE: getAddressByName(item.addresses, "cooperative"),
					PERSONAL: getAddressByName(item.addresses, "individual"),
					CLIENT_RECORD: getAddressByName(item.addresses, "client_record"),
					XEND_TOKEN: getAddressByName(item.addresses, "xend_token"),
					TOKEN: getAddressByName(item.addresses, "token"),
					PROTOCOL_CURRENCY: item.protocol_name.charAt(0) + "busd"
				}
			};
			protocols.push(protocol);
		}
	}

	return protocols;

}
export default bscMainnetAddresses;




export const getLayer2Protocols = async () => {
	try {
		let protocols: any[] = [];
		let base = process.env.ENV === 'development' ? 'http://localhost:3001' : 'https://api.xend.finance'
		let url = base + "/xend-finance/layer2-addresses"
		const res = await axios.get(url);
		let serverData = res.data.data;
		if (Array.isArray(serverData)) {
			// console.log()
			protocols = layer2Assets.map(asset => {
				let filter = serverData.filter((x: any) => x.network == asset.network && x.name == asset.protocolName && x.token.toLowerCase() == asset.name.toLowerCase());

				if (filter.length > 0) {
					asset.protocolAddress = filter[0].address;
				}

				return asset;
			})

		}


		return protocols

	} catch (e) {
		console.error(e);
		return []
	}
}




// const returnProtocolsNetwork = (protocolName: string) => {
// 	switch (protocolName) {
// 		case "venus":
// 			return 56;
// 		case "fortube":
// 			return 56;
// 		case "yearn":
// 			return 1;

// 		default:
// 			return 0;
// 	}
// }