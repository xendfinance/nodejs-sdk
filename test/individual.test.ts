
import Individual from '../src/contracts/individual';
import { ChainId } from '../src/utils/constants';


// the private key without the '0x' in front of it
const privateKey = '0x861e62d0427826c2588312f133893a7993512792c5182d23009b8824e71e9fe3'

describe('Individual:', () => {

  jest.setTimeout(300000);







  // SETUP

  const individual = new Individual(ChainId.MAINNET, privateKey);
  




  ////////////////////////////////////////////////////////////


  it('deposits in a flexible savings', async () => {

    let response = await individual.flexibleDeposit("100")

    let responseDataType = typeof response;

    expect(responseDataType).toBe("object");

  })



})
