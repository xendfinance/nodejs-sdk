
import Individual from '../src/contracts/individual';
import { ChainId } from '../src/utils/constants';


// the private key without the '0x' in front of it
const privateKey = '6acb20f8f1a6187188af1867d04e40c6426ef178a9526bfac7000cd3f91753ba'

describe('Individual:', () => {

  jest.setTimeout(300000);







  // SETUP

  const individual = new Individual(ChainId.MAINNET, privateKey);
  




  ////////////////////////////////////////////////////////////


  it('deposits in a flexible savings', async () => {

    let response = await individual.flexibleDeposit("100")

    let responseDataType = typeof response;

    console.log(response)

    expect(responseDataType).toBe("object");

  })



})
