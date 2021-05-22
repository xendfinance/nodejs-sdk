
import createContract from "../create.contract";
import EsusuService from '../abis/EsusuService.json';
import ABIS from "../abis";

const esusuInfo = async (esusuId: number, provider: string, addresses: Addresses) => {
  try {

    const contract = await createContract(provider, EsusuService, addresses.ESUSU_SERVICE);

    const data = await contract.methods.GetEsusuCycle(esusuId).call();

    return data

  } catch (error) {
    console.log(error)
    return {}
  }
}


export default esusuInfo;


export const esusuCyclesInAGroup = async (groupId: number, provider: string, addresses: Addresses) => {
  try {

    const contract = await createContract(provider, ABIS.ESUSU_STORAGE, addresses.ESUSU_STORAGE);

    // Length of cycles in a group
    const cyclesInGroupCount = await contract.methods.GetCycleIndexFromGroupId(groupId).call();

    // Get the cycles in group
    const cyclesList: Array<any> = [];

    if (cyclesInGroupCount > 0) {
      for (let position = cyclesInGroupCount; position > 0; position--) {
        const idOfEsusuByPositionInGroup = await contract.methods
          .GetCycleIdFromCycleIndexAndGroupId(groupId, position)
          .call();
        const info = await esusuInfo(idOfEsusuByPositionInGroup, provider, addresses);
        cyclesList.push(info);
      }
    }
    return cyclesList;

  } catch (e) {
    console.error(e)
    return []
  }
}
