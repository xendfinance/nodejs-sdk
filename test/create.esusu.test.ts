
import createEsusu from '../src/contracts/esusu/create.esusu';


const provider = 'https://rinkeby.infura.io/v3/e9c4665d91a343e295308d5995ff5a72';

const privateKey = 'fd0c10d724f6ccca84650a28ba8235e2e1a89a5240a5d5bc8ca25a688ecfc417';

describe('create esusu cycle', () => {

  it('should return an object', async () => {

    let response = await createEsusu({
      groupId: 1,
      depositAmount: 15,
      payoutIntevalSeconds: 120, // 2 minutes
      maxMembers: 5,
      startTimeInSeconds: 190, // 3 minutes from current time
      privateKey,
      provider
    })
    let responseDataType = typeof response;

    expect(responseDataType).toBe("object");

  })

})
