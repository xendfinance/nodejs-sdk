import { CreateWallet, RetrieveWallet } from '../src/utils/web3';

const privateKey = '0x12ae19093123cc3947745fbe40a1517c909e9e5526280ec018c17dc2261b3cf8';

describe('Create Wallet and Retrieve wallet', () => {
  it('creates a wallet and returns the address and private key', async () => {

    const wallet = await CreateWallet();

    expect(wallet).not.toBeNull();
    
    console.log(wallet);
  });

  it('retrieves a wallet using the private key and returns the wallet object', async () => {

    const wallet = await RetrieveWallet(privateKey);

    expect(wallet).not.toBeNull();
    
    console.log(wallet);
  });
});
