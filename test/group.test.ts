import Group from '../src/contracts/group';
import { ChainId } from '../src/utils/constants';

const privateKey = 'e87e7d528024d260430325eed72ee88236fa9d17e6ce9d0d4a1daf6a1411a956';



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