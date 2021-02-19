import { ChainId } from '../../utils/constants';
import flexibleDeposit from './flexible-deposit';
import fixedDeposit from './fixed-deposit';
import fixedDepositInfo from './get-fixed-deposit-record'
import { checkChainId } from '../../utils/helpers';
import flexibleDepositInfo from './get-flexible-deposit-record';
import fixedWithdrawal from './fixed-withdrawal';
import flexibleWithdrawal from './flexible-withdrawal';

type FixedDepositData = {
  depositAmount: any;
  depositDate: number;
  lockPeriod: number;
};
export default class Individual {
  provider: string;
  privateKey: string;

  constructor(chainId: ChainId, privateKey: string) {
    this.provider = checkChainId(chainId);
    this.privateKey = privateKey;
  }

  //////////////////////////////////////////////////////////////////////

  /**
   * Deposit in Flexible savings
   * @param depositAmount
   */

  async flexibleDeposit(depositAmount: any) {
    return await flexibleDeposit(this.provider, this.privateKey, depositAmount);
  }


  //////////////////////////////////////////////////////////////////////

  /**
   * Deposit in Fixed savings
   * @param args
   */

  async fixedDeposit(args: FixedDepositData) {
    return await fixedDeposit({
      ...args,
      depositDate: args.depositDate,
      depositAmount: args.depositAmount,
      lockPeriod: args.lockPeriod,
      provider: this.provider,
      privateKey: this.privateKey,
    });
  }

  //////////////////////////////////////////////////////////////////////


  /**
   * Get fixed deposit information for a particular address
   */

  async fixedDepositInformation() {
      return fixedDepositInfo(this.privateKey, this.provider);
  }

   /**
   * Get flexible deposit information for a particular address
   */

  async flexibleDepositInformation() {
    return flexibleDepositInfo(this.privateKey, this.provider);
}

  /**
   * withdraw from fixed deposit
   */

    //////////////////////////////////////////////////////////////////////

  async fixedDepositWithdrawal(recordId: number) {
    return fixedWithdrawal(this.privateKey, this.provider, recordId);
}

/**
   * withdraw from flexible deposit
   */

    //////////////////////////////////////////////////////////////////////

    async flexibleWithdrawal(amount: string) {
      return flexibleWithdrawal(this.privateKey, this.provider, amount);
  }
}
