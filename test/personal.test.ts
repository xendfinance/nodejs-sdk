require('dotenv').config()

import { Personal } from '../src';
import { ChainId } from '../src/utils/constants';
require('dotenv').config()

const chainid = ChainId.BSC_MAINNET;




// the private key without the '0x' in front of it
const privateKey = process.env.PK;

describe.skip('Personal', () => {

  jest.setTimeout(300000);

  // SETUP


  ////////////////////////////////////////////////////////////


  // tested and fine
  describe('.flexibleDeposit()', () => {

    it('should happen successfully', async () => {
      const personal = new Personal(chainid, privateKey, { env: "mainnet" });
      const dep = await personal.flexibleDeposit("5");

      console.log(dep, ' flexible deposite')

      expect(typeof dep).toBe("object")
    })

  })

  // tested and working
  describe('.withdrawFlexible()', () => {

    it('should withdraw success', async () => {
      const amount = "330";
      const personal = new Personal(chainid, privateKey, { env: "mainnet" });
      const dep = await personal.withdrawFlexible(amount);
      console.log(dep)

      expect(dep.status).toBe(true);
    })
  })


  // tested. and fine
  describe('.flexibleInfo()', () => {
    it('should show info', async () => {

      const personal = new Personal(chainid, privateKey, { env: "mainnet" });
      console.log(personal.protocol, ' the current protocol')
      const result = await personal.flexibleInfo();
      console.log(result, ' flesx ')
      expect(typeof result).toBe("object")

    })
  })


  // tested and fine
  describe('.fixedInfo()', () => {

    it('should return data', async () => {

      const personal = new Personal(chainid, privateKey, { env: "mainnet" });
      const result = await personal.fixedInfo();
      console.log(result, ' fixed info')

      expect(typeof result).toBe("object");
    })

  })


  // tested and works
  describe('.fixedDeposit()', () => {

    it('should deposit into fixed savings successfully', async () => {
      const amount = "1";
      const lockPeriod = 1622059800;
      const personal = new Personal(chainid, privateKey, { env: "mainnet" })
      const result = await personal.fixedDeposit(amount, lockPeriod);

      console.log(result, ' fixed deposit');

      expect(typeof result).toBe("object")
    })

  })


  // not confirmed yet
  describe('.withdrawFixed()', () => {

    it('successfully withdraws fixed deposit', async () => {
      const recordId = 220;
      const personal = new Personal(chainid, privateKey, { env: "mainnet" })
      const result = await personal.withdrawFixed(recordId);

      console.log(result, ' withdrawal of fixed');

      expect(typeof result).toBe("object")
    })

  })



})
