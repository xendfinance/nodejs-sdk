import GROUPS from "./Groups.json";
import ESUSU_SERVICE from "./EsusuService.json";
import ESUSU_ADAPTER from "./EsusuAdapter.json";
import ESUSU_STORAGE from "./EsusuStorage.json";
import COOPERATIVE from "./XendFinanceGroup.json";
import FADAPTER from "./FortubeAdapterTestnet.json";

const ABIS = {
    GROUPS,
    ESUSU_SERVICE,
    ESUSU_ADAPTER,
    ESUSU_STORAGE,
    COOPERATIVE,

    testnet: {
        esusu_service: ESUSU_SERVICE,
        groups: GROUPS,
        fortubeAdapter: FADAPTER,
    }
}


export default ABIS;