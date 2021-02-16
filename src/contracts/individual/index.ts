import { ChainId } from '../../utils/constants';
import depositFlexible from './flexible-deposit';
import { checkChainId } from '../../utils/helpers';

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
   * @param args
   */

  async depositFlexible(depositAmount: any) {
    return await depositFlexible(this.provider, this.privateKey, depositAmount);
  }
}
