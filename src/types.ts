

export interface Options {
    env: 'testnet' | 'local' | 'mainnet'
    protocols?: Protocols[]
    protocolName?: string
    [key: string]: any
}


export interface Addresses {
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

export interface Protocols {
    name: string
    code: string
    addresses: Addresses
}



export interface CooperativeCycleData {
    groupId: number;
    cycleStakeAmount: any;
    payoutIntervalInSeconds: number;
    startTimeInSeconds: number;
    maxMembers: number;
}


export interface EsusuCycleData {
    groupId: number
    depositAmount: any
    payoutIntervalInSeconds: number
    startTimeInSeconds: number
    maxMembers: number
}