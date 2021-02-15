
import Esusu from '../src/contracts/esusu';
import { ChainId } from '../src/utils/constants';


// the private key without the '0x' in front of it
const privateKey = '7a22cfd45ebddc524cee4d0552f3255b5e42dee7b2d766fd7737ab8cd18a72d8';
// const privateKey2 = '3c55580b730a298702479f6652844d3498d3df57dd21d8f6316e5e45c59c7236';

describe('Esusu:', () => {

  jest.setTimeout(300000);







  // SETUP

  const esusu = new Esusu(ChainId.MAINNET, privateKey);
  // const esusu2 = new Esusu(ChainId.MAINNET, privateKey2)

  const cycleStartTimeForTest = (new Date(new Date().getTime() + (4 * 60000)).getTime() / 1000).toFixed(0); // timestamp for current test. 3 minutes from current time





  ////////////////////////////////////////////////////////////


  it('creates an esusu cycle successfully', async () => {

    let response = await esusu.createEsusu({
      groupId: 1,
      depositAmount: "5",
      payoutIntervalInSeconds: 120, // 2 minutes
      maxMembers: 5,
      startTimeInSeconds: Number(cycleStartTimeForTest), // 4 minutes from current time
    })

    let responseDataType = typeof response;

    expect(responseDataType).toBe("object");

  })





  ////////////////////////////////////////////////////////////


  it('returns recently created cycle', async () => {

    const count = await esusu.getCreatedCyclesCount();
    const esusuId = await esusu.getCycleIdFromCreatedCyclesList(count);

    const info = await esusu.esusuInformation(esusuId);

    const infoDatatype = typeof info;

    expect(infoDatatype).toBe("object");
    expect(info.CycleStartTimeInSeconds).toEqual(cycleStartTimeForTest);

  }, 4000)





  ////////////////////////////////////////////////////////////


  it('first address joins successfully', async () => {

    const count = await esusu.getCreatedCyclesCount();
    const esusuId = await esusu.getCycleIdFromCreatedCyclesList(count);

    const response: any = await esusu.joinEsusu(esusuId);

    const responseDataType = typeof response;

    expect(responseDataType).toBe("object");
    expect(response.status).toEqual(true)

  })


  ////////////////////////////////////////////////////////////


  // it('second address joins successfully', async () => {

  //   console.log('doing the second address')

  //   const count = await esusu.getCreatedCyclesCount();
  //   const esusuId = await esusu.getCycleIdFromCreatedCyclesList(count);

  //   const response2: any = await esusu2.joinEsusu(esusuId);
  //   console.log('done with the second address')

  //   const response2DataType = typeof response2;

  //   expect(response2DataType).toBe("object");
  //   expect(response2.status).toEqual(true)

  // })


})
