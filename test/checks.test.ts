
import { Esusu } from '../src';
import { ChainId } from '../src/utils/constants';


describe('Esusu', () => {

    it('returns something:', async () => {

        const esusu = new Esusu(ChainId.BSC_TESTNET, '');

        const res = await esusu.chainId;
        console.log(res)

    })
})