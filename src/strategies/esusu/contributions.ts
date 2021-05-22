import privateKeyToAddress from "../../utils/privateKeyToAddress";
import ABIS from "../abis";
import createContract from "../create.contract";
import info from "./info";

export const numberOfContributions = async (provider: string, privateKey: string, addresses: Addresses) => {
    try {

        const client = privateKeyToAddress(provider, privateKey);

        const contract = await createContract(provider, ABIS.ESUSU_STORAGE, addresses.ESUSU_STORAGE);

        const count = await contract.methods.GetCycleIndexFromCycleMember(client).call();
        return Number(count);

    } catch (e) {
        console.error(e);
        return 0;
    }
}



export const esusuContributions = async (provider: string, privateKey: string, addresses: Addresses) => {
    try {
        const client = privateKeyToAddress(provider, privateKey);

        const contract = await createContract(provider, ABIS.ESUSU_STORAGE, addresses.ESUSU_STORAGE);

        // const protocolContract = await createContract(provider, ABIS.testnet.fortubeAdapter, addresses.PROTOCOL_ADAPTER);

        const esusuContributedList = await contract.methods.GetCycleIndexFromCycleMember(client).call();

        const count = Number(esusuContributedList);

        const cyclesList: Array<any> = [];
        for (let start = 0; start < count; start++) {
            const position = start + 1;
            const cycleId = await contract.methods
                .GetCycleIdFromCycleIndexAndCycleMember(position, client)
                .call();

            // let ROIBalance = await contract.methods.GetMemberCycleToBeneficiaryMapping(cycleId, memberAddress).call();

            // let PricePerFullShare = await protocolContract.methods.GetPricePerFullShare().call();

            // let TotalSharesAtStart = await contract.methods.GetEsusuCycleTotalSharesAtStart(cycleId).call();

            const cycle = await info(cycleId, provider, addresses)

            // const Withdrawable = (Number(PricePerFullShare) * Number(TotalSharesAtStart)) / Number(info.TotalMembers);

            let ROIBalance = await contract.methods.GetMemberCycleToBeneficiaryMapping(cycleId, client).call();

            const Capital = await contract.methods.GetMemberWithdrawnCapitalInEsusuCycle(cycleId, client).call();

            cyclesList.push({ ...cycle, ROIBalance, Capital });
        }

        return cyclesList;
    } catch (e) {
        // console.log(e);
        return [];
    }
}