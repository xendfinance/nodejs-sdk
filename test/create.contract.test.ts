
import createContract from '../src/contracts/create.contract';
import { ChainId } from '../src/utils/constants';
import { checkChainId } from '../src/utils/helpers';
import abi from './abi';

const address = "0x0d393dE80744Df016424AeC57ecfE39a414E13cc";
const provider = checkChainId(ChainId.RINKEBY);

describe('contract creation function', () => {

  test('should return an object having property called methods', async () => {

    let contract = await createContract(provider, abi, address);
    let returntype = typeof contract;

    expect(returntype).toBe("object");
    expect(contract).toHaveProperty('methods');

  })


})