import Group from '../src/contracts/group';
import { ChainId } from '../src/utils/constants';

const privateKey = 'f6e9e581e3f768917445e8e22e61f3f62e60d09cc154459cf32a11e20b54f184';



describe('Group tests ->', () => {
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

    let groupDatatype = typeof response;

    expect(groupDatatype).toBe("object");

  }, 4000)





})