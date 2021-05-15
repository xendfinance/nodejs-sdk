

interface Options {
    env: 'testnet' | 'local' | 'live'
    protocols?: Protocols[]
    protocolName?: string
    [key: string]: any
}


interface Addresses {
    PROTOCOL_ADAPTER: string
    PROTOCOL_SERVICE: string
    GROUPS: string
    CYCLES: string
    ESUSU_SERVICE: string
    ESUSU_STORAGE: string
    ESUSU_ADAPTER: string
    COOPERATIVE: string
    PERSONAL: string
    CLIENT_RECORD: string
    PORFOLIO: string
    XEND_TOKEN: string
    REWARDCONFIG: string
    BUSD_TOKEN: string
    PROTOCOL_CURRENCY: string
}

interface Protocols {
    name: string
    code: string
    addresses: Addresses
}