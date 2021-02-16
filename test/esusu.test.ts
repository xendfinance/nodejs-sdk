
import Esusu from '../src/contracts/esusu';
import { ChainId } from '../src/utils/constants';


// the private key without the '0x' in front of it
const privateKey = '7a22cfd45ebddc524cee4d0552f3255b5e42dee7b2d766fd7737ab8cd18a72d8';
const privateKey2 = '3c55580b730a298702479f6652844d3498d3df57dd21d8f6316e5e45c59c7236';

describe('Esusu:', () => {

  jest.setTimeout(300000);







  // SETUP

  const esusu = new Esusu(ChainId.MAINNET, privateKey);
  const esusu2 = new Esusu(ChainId.MAINNET, privateKey2)

  const cycleStartTimeForTest = (new Date(new Date().getTime() + (3 * 60000)).getTime() / 1000).toFixed(0); // timestamp for current test. 3 minutes from current time



  // function for waiting
  const waitTime = (minutes: number) => new Promise(resolve => setTimeout(resolve, minutes * 60 * 1000));


  ////////////////////////////////////////////////////////////


  it('creates an esusu cycle successfully', async () => {

    let response = await esusu.createEsusu({
      groupId: 1,
      depositAmount: "5",
      payoutIntervalInSeconds: 120, // 2 minutes
      maxMembers: 5,
      startTimeInSeconds: Number(cycleStartTimeForTest), // 3 minutes from current time
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

  })





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


  it('second address joins successfully', async () => {

    const count = await esusu.getCreatedCyclesCount();
    const esusuId = await esusu.getCycleIdFromCreatedCyclesList(count);

    const response2: any = await esusu2.joinEsusu(esusuId);

    const response2DataType = typeof response2;

    expect(response2DataType).toBe("object");
    expect(response2.status).toEqual(true)

  })


  ////////////////////////////////////////////////////////////////////////////////////


  it('starts the esusu cycle successfully', async () => {

    const count = await esusu.getCreatedCyclesCount();
    const esusuId = await esusu.getCycleIdFromCreatedCyclesList(count);


    // wait for 4 minutes
    await waitTime(4);

    //
    const response = await esusu.start(esusuId);

    expect(response.status).toEqual(true);


  })




  ////////////////////////////////////////////////////////////////////////////////////




  test('first account withdraws roi', async () => {

    const count = await esusu.getCreatedCyclesCount();
    const esusuId = await esusu.getCycleIdFromCreatedCyclesList(count);

    // wait for 3 minutes
    await waitTime(3);

    const response = await esusu.withdrawInterest(esusuId);

    expect(response.status).toEqual(true);

  })


  ////////////////////////////////////////////////////////////////////////////////


  test('first account withdraws capital', async () => {

    const count = await esusu.getCreatedCyclesCount();
    const esusuId = await esusu.getCycleIdFromCreatedCyclesList(count);

    // wait for 1 minutes
    await waitTime(1);

    const response = await esusu.withdrawCapital(esusuId);

    expect(response.status).toEqual(true);

  })





  ////////////////////////////////////////////////////////////


  it('returns recently created cycle', async () => {

    const count = await esusu.getCreatedCyclesCount();
    const esusuId = await esusu.getCycleIdFromCreatedCyclesList(count);

    const info = await esusu.esusuInformation(esusuId);

    console.log(info, ' the last info')

    const infoDatatype = typeof info;

    expect(infoDatatype).toBe("object");

  })


})
