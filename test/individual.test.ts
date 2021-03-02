
import Individual from '../src/contracts/individual';
import { ChainId } from '../src/utils/constants';


// the private key without the '0x' in front of it
const privateKey = 'b1bcbe4cc959f65a1bcceafb600b63d1bfe2a6ef754139a371bead453479674d'

describe('Individual:', () => {

  jest.setTimeout(300000);







  // SETUP



  ////////////////////////////////////////////////////////////


  it('deposits in a flexible savings', async () => {

    const individual = new Individual(ChainId.LOCALHOST, privateKey);

    let response = await individual.flexibleDeposit("100")

    let responseDataType = typeof response;

    expect(responseDataType).toBe("object");

  })

  it('deposits in a fixed savings', async () => {

    const individual = new Individual(ChainId.LOCALHOST, privateKey);

    let response = await individual.fixedDeposit({
      depositAmount: "100",
      depositDate: 240,
      lockPeriod: 60
    })

    let responseDataType = typeof response;

    expect(responseDataType).toBe("object");

  })

  it('gets the client record in a flexible savings', async () => {

    const individual = new Individual(ChainId.LOCALHOST, privateKey);

    let response = await individual.flexibleDepositInformation();

    let responseDataType = typeof response;

    expect(responseDataType).toBe("object");

  })



})
