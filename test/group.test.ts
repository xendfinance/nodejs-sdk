import Group from '../src/contracts/group';
import { ChainId } from '../src/utils/constants';

const privateKey = '7a22cfd45ebddc524cee4d0552f3255b5e42dee7b2d766fd7737ab8cd18a72d8';
// const privateKey = '0x7a22cfd45ebddc524cee4d0552f3255b5e42dee7b2d766fd7737ab8cd18a72d8';


describe.skip('Group tests ->', () => {
  jest.setTimeout(300000); // increase default time



  ///////////////////////////////////////////////////////////////////////////////////////


  let groupName = 'TestGroup' + Date.now().toString();
  let groupSymbol = 'TGP';

  test('returns an object with status and msg property', async () => {

    const group = await new Group(ChainId.MAINNET, privateKey);


    let response = await group.createGroup(groupName, groupSymbol);

    let responseDataType = typeof response;

    expect(responseDataType).toBe("object");
    expect(response.status).toEqual(true);


  })

  ////////////////////////////////////////////////////////////////////////////////////////

  test('should return an object', async () => {

    const group = await new Group(ChainId.MAINNET, privateKey);

    let response = await group.getGroup(1);
    console.log(response)

    let groupDatatype = typeof response;

    expect(groupDatatype).toBe("object");

  }, 4000)





})