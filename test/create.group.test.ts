// import { checkChainId } from '../src/utils/helpers';
import createGroup from '../src/contracts/group/create.group';
// import { ChainId } from '../src/utils/constants';

const provider = 'https://rinkeby.infura.io/v3/e9c4665d91a343e295308d5995ff5a72';


const privateKey = 'fd0c10d724f6ccca84650a28ba8235e2e1a89a5240a5d5bc8ca25a688ecfc417';

describe.skip('creates a new group', () => {

  let groupName = 'TestGroup' + Date.now().toString();

  let groupSymbol = 'TGP';

  // let groupName2 = 'TestGroup2';
  // let groupSymbol2 = 'TST';


  // let response1 = await createGroup({
  //   privateKey,
  //   provider,
  //   groupName: groupName2,
  //   groupSymbol: groupSymbol2
  // });



  jest.setTimeout(300000);


  it('returns an object with status and msg property', async () => {

    let response = await createGroup({
      privateKey,
      provider,
      groupName,
      groupSymbol
    });

    let responseDataType = typeof response;

    expect(responseDataType).toBe("object");
    // expect(response).toHaveProperty(["status", "msg"]);

  })

  // test('return object status should be false with msg=group already exists', async () => {

  //   expect(response1.status).toBe(false);
  //   expect(response1.msg).toBe("group already exists");

  // })

  // test('return object status should be true with msg=successful', () => {

  //   expect(response.status).toBe(true);
  //   expect(response.msg).toBe("successful");

  // })

})