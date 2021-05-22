import privateKeyToAddress from "../../utils/privateKeyToAddress";
import sendSignedTransaction from "../../utils/sendSignedTransaction";
import ABIS from "../abis"
import createContract from "../create.contract"


export const createCooperativeGroup = async (
    groupName: string,
    symbol: string,
    provider: string,
    privateKey: string,
    addresses: Addresses) => {

    try {

        const groupContract = await createContract(provider, ABIS.GROUPS, addresses.GROUPS);
        const contract = await createContract(provider, ABIS.COOPERATIVE, addresses.COOPERATIVE)

        const groupExists = await groupContract.methods.getGroupIndexerByName(groupName).call();

        if (groupExists.exist) {
            throw Error('group name already exists')
        }

        const data = await contract.methods.createGroup(groupName, symbol);

        const receipt = await sendSignedTransaction(privateKey, provider, data, addresses.COOPERATIVE);

        return {
            status: true,
            msg: '',
            data: receipt
        };

    } catch (err) {
        console.error(err)
        return {
            status: false,
            msg: '',
            data: err
        }
    }
}






export const getCooperativeGroups = async (provider: string, privateKey: string, addresses: Addresses) => {
    try {
        const client = privateKeyToAddress(provider, privateKey);

        const groupsContract = await createContract(provider, ABIS.GROUPS, addresses.GROUPS)
        // const contract

        const count = await groupsContract.methods.getRecordIndexLengthForCreator(client).call()
        console.log(count, ' the group count')

        return {}
    } catch (e) {

        return {}
    }
}