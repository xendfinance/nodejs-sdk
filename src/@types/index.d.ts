

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
    COOPERATIVE: string // usually yearn group
    PERSONAL: string // usually individual
    CLIENT_RECORD: string
    XEND_TOKEN: string
    TOKEN: string // usually busd token
    PROTOCOL_CURRENCY: string
}

interface Protocols {
    name: string
    code: string
    addresses: Addresses
}



interface CooperativeCycleData {
    groupId: number;
    cycleStakeAmount: any;
    payoutIntervalInSeconds: number;
    startTimeInSeconds: number;
    maxMembers: number;
};


interface FixedDepositData {
    depositAmount: any;
    lockPeriod: number;
}


interface EsusuCycleData {
    groupId: number
    depositAmount: any
    payoutIntervalInSeconds: number
    startTimeInSeconds: number
    maxMembers: number
}