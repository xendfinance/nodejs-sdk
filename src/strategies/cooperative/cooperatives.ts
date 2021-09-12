
import { Addresses } from '../../types';
import createContract from '../create.contract';
import privateKeyToAddress from '../../utils/privateKeyToAddress';
import ABIS from '../abis';


export const contributions = async (provider: string, privateKey: string, addresses: Addresses) => {

  try {

    const client = privateKeyToAddress(provider, privateKey);
    const contract = await createContract(provider, ABIS.CYCLES, addresses.CYCLES)

    let count = await contract.methods.getRecordIndexLengthForCycleMembersByDepositor(client).call();

    const cyclesList: Array<any> = [];

    for (let indexcount = 0; indexcount < count; indexcount++) {

      let cyclesIndex: any = {}

      cyclesIndex = await contract.methods
        .getRecordIndexForCycleMembersIndexerByDepositor(client, indexcount)
        .call();


      //this line of code gets the cycles info by its general index
      const info = await contract.methods.getCycleMember(String(cyclesIndex['1'])).call();

      //this line of code gets the main cycle information by its id
      const cycle = await contract.methods.getCycleInfoById(info.cycleId).call();

      cyclesList.push({ ...info, ...cycle });
    }

    return cyclesList;

  } catch (err) {
    console.log(err)
    return [];
  }
}





export const cyclesInGroup = async (groupId: string, provider: string, addresses: Addresses) => {

  try {
    const contract = await createContract(provider, ABIS.CYCLES, addresses.CYCLES);
    // Length of cycles in a group
    const count = await contract.methods.getRecordIndexLengthForGroupCycleIndexer(groupId).call();

    // Get the cycles in group
    const cyclesList: Array<any> = [];

    if (Number(count) > 0) {
      for (let position = 0; position < Number(count); position++) {

        const exists = await contract.methods.getRecordIndexForGroupCycle(groupId, position).call();
        if (exists[0]) {
          let info = await contract.methods.getCycleInfoByIndex(exists[1]).call();
          cyclesList.push(info);
        }

      }

      return cyclesList;

    } else {
      return []
    }
  } catch (e) {
    console.error(e);
    return [];
  }
}