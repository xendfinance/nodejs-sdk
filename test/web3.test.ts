import { ChainId } from '../src/utils/constants';
import XendFinance from '../src/init';

// const privateKey = 'fd0c10d724f6ccca84650a28ba8235e2e1a89a5240a5d5bc8ca25a688ecfc417';

describe.skip('Create Wallet and Retrieve wallet', () => {
  it('creates a wallet and returns the address and private key', async () => {


    let initializer = new XendFinance(ChainId.RINKEBY, 'private key');


    const wallet = await initializer.createWallet();

    expect(wallet).not.toBeNull();

    // console.log(wallet);
  }, 1000);

  it('retrieves a wallet using the private key and returns the wallet object', async () => {

    let initializer = new XendFinance(ChainId.RINKEBY, 'private key');

    const wallet = await initializer.retrieveWallet();

    expect(wallet).not.toBeNull();

    // console.log(wallet);
  }, 1000);

});
