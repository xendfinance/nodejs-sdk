
import getGroup from '../src/contracts/group/get.groups';

const provider = 'https://rinkeby.infura.io/v3/e9c4665d91a343e295308d5995ff5a72';
const privateKey = 'fd0c10d724f6ccca84650a28ba8235e2e1a89a5240a5d5bc8ca25a688ecfc417';

describe('get groups', () => {

  jest.setTimeout(300000);

  it('should return an object', async () => {

    //

    let data = {
      provider,
      privateKey,
      groupId: 1
    }

    let groups = await getGroup(data)

    let groupDatatype = typeof groups;

    expect(groupDatatype).toBe("object");

  })

})
