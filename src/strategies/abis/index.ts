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

const ABIS = {
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

    testnet: {
        esusu_service: ESUSU_SERVICE,
        groups: GROUPS,
        fortubeAdapter: FADAPTER,
    }
}


export default ABIS;