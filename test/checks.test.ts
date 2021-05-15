
import { Esusu } from '../src';
import { ChainId } from '../src/utils/constants';


let privateKey = '';

describe('Esusu', () => {

    it('returns something:', async () => {

        const esusu = new Esusu(ChainId.BSC_TESTNET, privateKey);

        const res = await esusu.info(1);
        console.log(res)

    })
})