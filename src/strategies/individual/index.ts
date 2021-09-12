import { Options, Addresses } from '../../types';
import flexibleDeposit from './flexible-deposit';
import fixedDeposit from './fixed-deposit';
import fixedDepositInfo from './get-fixed-deposit-record'
import flexibleDepositInfo from './get-flexible-deposit-record';
import fixedWithdrawal from './fixed-withdrawal';
import flexibleWithdrawal from './flexible-withdrawal';





export default class Personal {

  options: Options;
  privateKey: string
  provider: string

  protocol: string
  addresses: Addresses

  constructor(provider: string, privateKey: string, options: Options, addresses: Addresses, protocol: string) {
    this.provider = provider;
    this.privateKey = privateKey;
    this.options = options;
    this.addresses = addresses;
    this.protocol = protocol;
  }



  //////////////////////////////////////////////////////////////////////

  /**
   * Deposit in Flexible savings
   * @param depositAmount
   */

  async flexibleDeposit(depositAmount: string) {
    return await flexibleDeposit(this.provider, this.privateKey, depositAmount, this.addresses);
  }


  //////////////////////////////////////////////////////////////////////

  /**
   * Deposit in Fixed savings
   * @param depositAmount should be in BUSD eg 100
   * @param lockPeriod is the lock period in seconds
   */

  async fixedDeposit(depositAmount: string, lockPeriod: number) {
    return await fixedDeposit({
      depositAmount: depositAmount,
      lockPeriod: lockPeriod,
      provider: this.provider,
      privateKey: this.privateKey,
    }, this.addresses);
  }

  //////////////////////////////////////////////////////////////////////


  /**
   * Get fixed deposit information for a particular address
   */

  async fixedInfo() {
    return fixedDepositInfo(this.provider, this.privateKey, this.addresses);
  }

  /**
  * Get flexible deposit information for a particular address
  */

  async flexibleInfo() {
    return flexibleDepositInfo(this.provider, this.privateKey, this.addresses);
  }

  /**
   * withdraw from fixed deposit
   */

  //////////////////////////////////////////////////////////////////////

  async withdrawFixed(recordId: number) {
    return fixedWithdrawal(this.privateKey, this.provider, recordId, this.addresses);
  }

  /**
     * withdraw from flexible deposit
     */

  //////////////////////////////////////////////////////////////////////
  /**
   * 
   * @param amount should be the share balance amount that is to be withdrawn
   */
  async withdrawFlexible(amount: string) {
    return flexibleWithdrawal(this.privateKey, this.provider, amount, this.addresses, this.protocol);
  }
}
