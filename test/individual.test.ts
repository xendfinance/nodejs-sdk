
import Individual from '../src/contracts/individual';
import { ChainId } from '../src/utils/constants';


// the private key without the '0x' in front of it
const privateKey = 'e5eaf84444c4aff109de2ad9c748f21502561d622de2574ffe1ef7afe4807569'

describe('Individual:', () => {

  jest.setTimeout(300000);







  // SETUP

  const individual = new Individual(ChainId.MAINNET, privateKey);
  
console.log(individual, 'here')


  ////////////////////////////////////////////////////////////


  it('deposits in a flexible savings', async () => {

    let response = await individual.flexibleDeposit("100")

    let responseDataType = typeof response;

    expect(responseDataType).toBe("object");

  })

  it('deposits in a fixed savings', async () => {

    let response = await individual.fixedDeposit({
      depositAmount: "100",
      depositDate: 240,
      lockPeriod: 60
    })

    let responseDataType = typeof response;

    expect(responseDataType).toBe("object");

  })

  it('gets the client record in a flexible savings', async () => {

    let response = await individual.flexibleDepositInformation();

    let responseDataType = typeof response;

    expect(responseDataType).toBe("object");

  })



})
