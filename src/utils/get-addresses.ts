import * as Types from '../types';
import { ChainId } from "./constants";
import { capitalizeFirstLetter, getAddressByName } from '../utils/helpers';
import axios from "axios";

const getMainnetAddresses = async (chainId: number) => {

	if (chainId === ChainId.BSC_MAINNET) {
		//
		const url = "https://api.xend.finance/xend-finance/addresses";
		const res = await axios.get(url)
		return res.data.data;
	} else throw Error('can only get address for mainnet')
}




const bscMainnetAddresses = async (chainId: number) => {

	const data = await getMainnetAddresses(chainId);

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