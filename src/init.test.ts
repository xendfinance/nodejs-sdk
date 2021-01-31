
import XendFinance from './init';
import { ChainId } from './utils/constants';

describe('Initializing SDK', () => {

  let initializer = new XendFinance(ChainId.MAINNET);

  test('the initializer is an instance of the correct class', () => {
    expect(initializer).toBeInstanceOf(XendFinance);
  })

  test('chain id should not be a string', () => {
    let datatype = typeof ChainId.MAINNET;
    expect(datatype).not.toBe("string")
  })

  test('chain id is mainnet', () => {
    expect(initializer.chainId).toBe(ChainId.MAINNET)
  })


})