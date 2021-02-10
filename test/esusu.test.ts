
import Esusu from '../src/contracts/esusu';
import { ChainId } from '../src/utils/constants';


// const provider = 'https://rinkeby.infura.io/v3/e9c4665d91a343e295308d5995ff5a72';

const privateKey = 'fd0c10d724f6ccca84650a28ba8235e2e1a89a5240a5d5bc8ca25a688ecfc417';

describe('esusu tests', () => {

  jest.setTimeout(300000);

  const esusu = new Esusu(ChainId.RINKEBY, privateKey);

  const cycleStartTimeForTest = (new Date(new Date().getTime() + (4 * 60000)).getTime() / 1000).toFixed(0); // timestamp for current test. 3 minutes from current time

  it.skip('creates an esusu cycle successfully', async () => {

    let response = await esusu.createEsusu({
      groupId: 1,
      depositAmount: 15,
      payoutIntervalInSeconds: 120, // 2 minutes
      maxMembers: 5,
      startTimeInSeconds: Number(cycleStartTimeForTest), // 4 minutes from current time
    })

    let responseDataType = typeof response;

    expect(responseDataType).toBe("object");

  })

  it('returns recently created cycle', async () => {

    const count = await esusu.getCreatedCyclesCount();

    const esusuId = await esusu.getCycleIdFromCreatedCyclesList(count);

    const info = await esusu.esusuInformation(esusuId);

    const infoDatatype = typeof info;

    expect(infoDatatype).toBe("object");
    expect(info.CycleStartTimeInSeconds).toEqual(cycleStartTimeForTest);




  }, 4000)


})
