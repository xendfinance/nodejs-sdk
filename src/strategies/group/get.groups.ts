import createContract from "../create.contract";
import abi from '../abis/Groups.json';
import privateKeyToAddress from "../../utils/privateKeyToAddress";
import getGroup from "./get.group";

const getGroups = async (privateKey: string, provider: string, addresses: Addresses) => {

    try {

        const client = privateKeyToAddress(provider, privateKey);

        const contract = await createContract(provider, abi, addresses.GROUPS)
        const len = await contract.methods.getRecordIndexLengthForCreator(client).call()
        console.log(len)
        console.log(client, ' client')

        let groups = [];
        for (let start = len - 1; start > -1; start--) {
            let exist = await contract.methods.getGroupForCreatorIndexer(client, start).call();
            console.log(exist, ' before exist check')
            if (exist.exist) {
                const group = await getGroup({ provider, groupId: start + 1 }, addresses)
                groups.push(group);
            }
        }

        return groups;

    } catch (e) {
        console.error(e)
        return []
    }
}


export default getGroups;