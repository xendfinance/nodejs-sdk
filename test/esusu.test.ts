import Web3 from 'web3';
import Esusu from '../src/strategies/esusu';
import { ChainId } from '../src/utils/constants';
import { checkChainId } from '../src/utils/helpers';
import DaiABI from '../src/strategies/abis/DaiContract.json';
import createContract from '../src/strategies/create.contract';
import testnetProtocols from '../src/environments/testnet';


// the private key without the '0x' in front of it
const privateKey = 'f6e9e581e3f768917445e8e22e61f3f62e60d09cc154459cf32a11e20b54f184';
const privateKey2 = '1c5e010ac170a3ba7f7d888afc94d10a1faffe74de6ed3710e149acac42092b1';

describe.skip('Esusu:', () => {

  jest.setTimeout(300000);

  const unlockedAddress = "0xdcd024536877075bfb2ffb1db9655ae331045b4e";
  const chainID = ChainId.BSC_TESTNET;
  const web3 = new Web3(checkChainId(chainID).url)
  let esusu: Esusu;
  let esusu2: Esusu;



  // timestamp for current test. 3 minutes from current time
  const cycleStartTimeForTest = (new Date(new Date().getTime() + (3 * 60000)).getTime() / 1000).toFixed(0);




  // send dai to address from the unlocked address
  async function sendDai(amount: string, recepient: string) {
    const contract = await createContract(checkChainId(chainID).url, DaiABI, testnetProtocols[0].addresses.TOKEN);
    let amountToSend = web3.utils.toWei(amount);
    await contract.methods.transfer(recepient, amountToSend).send({ from: unlockedAddress })
  }

  // function for waiting
  const waitTime = (minutes: number) => new Promise(resolve => setTimeout(resolve, minutes * 60 * 1000));


  // SETUP

  beforeAll(async () => {

    const accountsForTest = await web3.eth.getAccounts();

    const firstAccount = accountsForTest[0];
    const secondAccount = accountsForTest[1];

    await sendDai("100", firstAccount) // send dai to first account
    await sendDai("100", secondAccount) // send dai to second account

    esusu = new Esusu(chainID, privateKey);
    esusu2 = new Esusu(chainID, privateKey2)

  })
















  // 1:  ////////////////////////////////////////////////////


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
  // 2:  ////////////////////////////////////////////////////


  it('returns recently created cycle', async () => {

    const count = await esusu.getCreatedCyclesCount();
    const esusuId = await esusu.getCycleIdFromCreatedCyclesList(count);

    const info = await esusu.esusuInformation(esusuId);

    const infoDatatype = typeof info;

    expect(infoDatatype).toBe("object");
    expect(info.CycleStartTimeInSeconds).toEqual(cycleStartTimeForTest);

  })





  ////////////////////////////////////////////////////////////
  // 3:  ////////////////////////////////////////////////////

  it('first address joins successfully', async () => {

    const count = await esusu.getCreatedCyclesCount();
    const esusuId = await esusu.getCycleIdFromCreatedCyclesList(count);

    const response: any = await esusu.joinEsusu(esusuId);

    const responseDataType = typeof response;

    expect(responseDataType).toBe("object");
    expect(response.status).toEqual(true)

  })


  ////////////////////////////////////////////////////////////
  // 4:  ////////////////////////////////////////////////////


  it('second address joins successfully', async () => {

    const count = await esusu.getCreatedCyclesCount();
    const esusuId = await esusu.getCycleIdFromCreatedCyclesList(count);

    const response2: any = await esusu2.joinEsusu(esusuId);

    const response2DataType = typeof response2;

    expect(response2DataType).toBe("object");
    expect(response2.status).toEqual(true)

  })


  ////////////////////////////////////////////////////////////////////////////////////
  // 5:  ////////////////////////////////////////////////////


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
  // 6:  ////////////////////////////////////////////////////




  test('first account withdraws roi', async () => {

    const count = await esusu.getCreatedCyclesCount();
    const esusuId = await esusu.getCycleIdFromCreatedCyclesList(count);

    // wait for 3 minutes
    await waitTime(3);

    const response = await esusu.withdrawInterest(esusuId);

    expect(response.status).toEqual(true);

  })


  ////////////////////////////////////////////////////////////////////////////////
  // 7:  ////////////////////////////////////////////////////


  test('first account withdraws capital', async () => {

    const count = await esusu.getCreatedCyclesCount();
    const esusuId = await esusu.getCycleIdFromCreatedCyclesList(count);

    // wait for 1 minutes
    await waitTime(1);

    const response = await esusu.withdrawCapital(esusuId);

    expect(response.status).toEqual(true);

  })





  ////////////////////////////////////////////////////////////
  // 8:  ////////////////////////////////////////////////////


  it('returns recently created cycle', async () => {

    const count = await esusu.getCreatedCyclesCount();
    const esusuId = await esusu.getCycleIdFromCreatedCyclesList(count);

    const info = await esusu.esusuInformation(esusuId);

    console.log(info, ' the last info')

    const infoDatatype = typeof info;

    expect(infoDatatype).toBe("object");

  })


})
