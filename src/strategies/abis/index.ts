import GROUPS from "./Groups.json";
import ESUSU_SERVICE from "./EsusuService.json";
import ESUSU_ADAPTER from "./EsusuAdapter.json";
import ESUSU_STORAGE from "./EsusuStorage.json";
import COOPERATIVE from "./XendFinanceGroup.json";
import FADAPTER from "./FortubeAdapterTestnet.json";
import TOKEN from "./DaiContract.json";
import PERSONAL from "./XendFinanceIndividual_Yearn_V1.json";
import CLIENT_RECORD from "./ClientRecord.json";
import CYCLES from "./Cycles.json";
import PROTOCOL_ADAPTER from "./ProtocolAdapter.json";
import XAUTO from './xAuto.json';
import XVAULT from './xVault.json';
import ERC20 from './ER20.json';
import BUSD from './busd.json';
//v2 XVault BSC
import xvVaultUSDCV2 from './V2XVault/XVaultUSDCV2.json';
import xvVaultUSDTV2 from './V2XVault/XVaultUSDTV2.json';
import xvVaultBUSDV2 from './V2XVault/XVaultBUSDV2.json';

//v2 XAuto BSC
import xvAutoBSCBUSDV2 from './V2XAuto/xvAutoBUSDV2.json';
import xvAutoBSCUSDCV2 from './V2XAuto/xvAutoUSDCV2.json';
import xvAutoBSCUSDTV2 from './V2XAuto/xvAutoUSDTV2.json';
import xvAutoBSCBNBV2 from './V2XAuto/xvAutoBNBV2.json';

//v2 XAuto Matic 
import xvAutoUSDCV2Matic from './V2XAutoMatic/xvAutoUSDCV2.json';
import xvAutoUSDTV2Matic from './V2XAutoMatic/xvAutoUSDTV2.json';
import xvAutoAAVEV2Matic from './V2XAutoMatic/xvAutoAAVEV2.json';
import xvAutoWBTCV2Matic from './V2XAutoMatic/xvAutoWBTCV2.json';

const ABIS = {
    BUSD,
    GROUPS,
    ESUSU_SERVICE,
    ESUSU_ADAPTER,
    ESUSU_STORAGE,
    COOPERATIVE,
    TOKEN,
    PERSONAL,
    CYCLES,
    CLIENT_RECORD,
    PROTOCOL_ADAPTER,
    xvVaultUSDCV2,
    xvVaultUSDTV2,
    xvVaultBUSDV2,
    xvAutoBSCBUSDV2,
    xvAutoBSCUSDCV2,
    xvAutoBSCUSDTV2,
    xvAutoBSCBNBV2,
    xvAutoUSDCV2Matic,
    xvAutoUSDTV2Matic,
    xvAutoAAVEV2Matic,
    xvAutoWBTCV2Matic,
    XAUTO,
    XVAULT,
    ERC20,

    testnet: {
        esusu_service: ESUSU_SERVICE,
        groups: GROUPS,
        fortubeAdapter: FADAPTER,
    }
}


export default ABIS;