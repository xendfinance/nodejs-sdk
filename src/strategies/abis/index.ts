
const ABIS = {
    GROUPS: require('./Groups.json'),
    ESUSU_SERVICE: require('./EsusuService.json'),
    ESUSU_ADAPTER: require('./EsusuAdapter.json'),
    ESUSU_STORAGE: require('./EsusuStorage.json'),
    COOPERATIVE: require('./XendFinanceGroup.json'),

    testnet: {
        esusu_service: require('./esusu-service.json'),
        groups: require('./groups.json'),
        fortubeAdapter: require('./FortubeAdapterTestnet.json'),
    }
}


export default ABIS;