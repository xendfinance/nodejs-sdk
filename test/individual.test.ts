
import Individual from '../src/strategies/individual';
import { ChainId } from '../src/utils/constants';

const chainid = ChainId.BSC_TESTNET;

// the private key without the '0x' in front of it
const privateKey = '77198bea638643efe980dc29695ffe5ecb8562ee9d49d3cc7e46c3636b19eb53'

describe.skip('Individual:', () => {

  jest.setTimeout(300000);







  // SETUP



  ////////////////////////////////////////////////////////////


  it('deposits in a flexible savings', async () => {

    const individual = new Individual(chainid, privateKey);

    let response = await individual.flexibleDeposit("100")

    let responseDataType = typeof response;

    expect(responseDataType).toBe("object");

  })

  it('deposits in a fixed savings', async () => {

    const individual = new Individual(chainid, privateKey);

    let response = await individual.fixedDeposit({
      depositAmount: "100",
      depositDate: 240,
      lockPeriod: 60
    })

    let responseDataType = typeof response;

    expect(responseDataType).toBe("object");

  })

  it('gets the client record in a flexible savings', async () => {

    const individual = new Individual(chainid, privateKey);

    let response = await individual.flexibleDepositInformation();

    console.log(response, 'client record info')

    let responseDataType = typeof response;

    expect(responseDataType).toBe("object");

  })



})
