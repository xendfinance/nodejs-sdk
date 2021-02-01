
import XendFinance from '../src/init';
import { ChainId } from '../src/utils/constants';


const privateKey = '0x12ae19093123cc3947745fbe40a1517c909e9e5526280ec018c17dc2261b3cf8';

describe('Initializing SDK', () => {

  let initializer = new XendFinance(ChainId.MAINNET, privateKey);

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

  test('wallet should not be null', async () => {
    let wallet = await initializer.createWallet()
    console.log(wallet, ' the wallet')
    expect(wallet).not.toBeNull();
  })

})