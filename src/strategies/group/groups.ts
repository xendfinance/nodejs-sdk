
import { Addresses } from '../../types';
import privateKeyToAddress from '../../utils/privateKeyToAddress';
import sendSignedTransaction from '../../utils/sendSignedTransaction';
import ABIS from '../abis/index';
import createContract from '../create.contract';

export const createEsusuGroups = async (
    name: string,
    symbol: string,
    provider: string,
    privateKey: string,
    addresses: Addresses
) => {

    try {

        // const client = privateKeyToAddress(provider, privateKey);
        const groupsContract = await createContract(provider, ABIS.GROUPS, addresses.GROUPS);
        const groupExists = await groupsContract.methods.getGroupIndexerByName(name).call();


        if (groupExists.exist) {
            throw Error('group name already exists')
        }

        const contx = await createContract(provider, ABIS.ESUSU_SERVICE, addresses.ESUSU_SERVICE);

        const data = await contx.methods.CreateGroup(name, symbol);

        let receipt = await sendSignedTransaction(privateKey, provider, data, addresses.ESUSU_SERVICE)

        return {
            status: true,
            msg: "",
            data: receipt
        }

    } catch (e) {
        console.error(e);

        return {
            status: false,
            msg: "",
            data: e
        }
    }

}


export const getEsusuGroups = async (
    provider: string,
    privateKey: string,
    addresses: Addresses) => {
    try {

        const client = privateKeyToAddress(provider, privateKey);

        // create contracts 
        const contract = await createContract(provider, ABIS.GROUPS, addresses.GROUPS)
        const esusuAdapter = await createContract(provider, ABIS.ESUSU_ADAPTER, addresses.ESUSU_ADAPTER);

        const groupsCount = await contract.methods.getRecordIndexLengthForCreator(client).call();

        let createdGroups: Array<any> = [];
        for (let start = groupsCount - 1; start > 1; start--) {


            const grp = await contract.methods.getGroupForCreatorIndexer(client, start).call();
            if (grp.exist) {


                let grpId = Number(grp.index) + 1;
                let group = await esusuAdapter.methods.GetGroupInformationById(grpId).call();

                createdGroups.push(group);
            }

        }

        return createdGroups;

    } catch (e) {
        console.error(e);

        return []
    }
}