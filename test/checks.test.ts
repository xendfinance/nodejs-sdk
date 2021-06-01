import XF, { Cooperative, Esusu } from '../src';
import { ChainId } from '../src/utils/constants';
require('dotenv').config()


let privateKey = process.env.PK;
const chainId = ChainId.BSC_MAINNET;




/// Esusu tests
describe.skip('Esusu', () => {
    jest.setTimeout(300000);

    describe.skip('.info()', () => {

        it('returns something:', async () => {

            const esusu = new Esusu(97, privateKey)
            const expectedResult = "1"
            const res = await esusu.info(1)
            expect(res.CycleId).toBe(expectedResult)
        })
    })


    describe.skip('.groups()', () => {
        it('should return data', async () => {
            const esusu = new Esusu(56, privateKey, { env: "mainnet" })
            const result = await esusu.getGroups();
            console.log(result, ' from esusu')
            expect(typeof result).toBe("object")
        })
    })


    describe('.contributionsCount()', () => {
        it('should be a number', async () => {

            const esusu = new Esusu(56, privateKey, { env: "mainnet" })
            const result = await esusu.contributionsCount();

            expect(typeof result).toBe("number");
        })
    })


    describe.skip('.contributions()', () => {
        it('should return an array', async () => {

            const esusu = new Esusu(56, privateKey, { env: "mainnet" })
            const result = await esusu.contrubution();

            expect(typeof result).toBe("object");
        })
    })


    describe.skip('.cyclesInGroup()', () => {

        it('should return an array', async () => {

            const esusu = new Esusu(56, privateKey, { env: "mainnet" })
            const result = await esusu.cyclesInGroup(6);

            expect(typeof result).toBe('object');
        })
    })


    describe.skip('.create()', () => {
        it('should create successfully', async () => {

            const esusu = new Esusu(97, privateKey)
            const result = await esusu.create({
                groupId: 18,
                depositAmount: "11",
                payoutIntervalInSeconds: 300,
                startTimeInSeconds: 1621840519,
                maxMembers: 4
            })
            console.log(result, ' the result')
        })
    })


    describe.skip('.walletBalance()', () => {
        it('should return the users wallet balance', async () => {

            const esusu = new Esusu(97, privateKey)
            const result = await esusu.walletBalance();

            console.log(result, ' balance')
            expect(typeof result).toBe("string")
        })
    })


})




// Cooperative Tests

describe.skip('Cooperative', () => {

    jest.setTimeout(300000);

    describe('.createGroup()', () => {
        it('should work successfully', async () => {
            const groupName = "Speedometer";
            const groupSymble = "SPG";
            const cooperative = new Cooperative(97, privateKey)
            const result = await cooperative.createGroup(groupName, groupSymble)
            console.log(result, ' receipt')
            expect(typeof result).toBe("object");

        })
    })

    describe('.groups()', () => {
        it('should return object data', async () => {
            const cooperative = new Cooperative(chainId, privateKey, { env: "mainnet" })
            const result = await cooperative.groups();
            console.log(result, ' from cooperative')
            expect(typeof result).toBe("object");
        })
    })



    // tested and works
    describe('.contributions()', () => {

        it('should return array of contributions', async () => {

            const cooperative = new Cooperative(chainId, privateKey, { env: "mainnet" })

            const result = await cooperative.contributions();
            console.log(result)

            expect(typeof result).toBe("object");
        })

    })



    // tested and working
    describe('.cyclesInGroup()', () => {

        it('should return array of contributions', async () => {
            const groupId = "8";
            const cooperative = new Cooperative(chainId, privateKey, { env: "mainnet" })

            const result = await cooperative.cyclesInGroup(groupId);
            console.log(result)

            expect(typeof result).toBe("object");
        })

    })
})










describe.skip('General', () => {

    describe('.availableProtocols', () => {
        it('should return array of protocols', async () => {
            const sdk = new XF(56, privateKey);
            const result = sdk.availableProtocols;
            console.log(result)
            expect(typeof result).toBe('object')
        })
    })



    describe('.walletBalance()', () => {
        it('should return wallet balance in string', async () => {
            const sdk = new XF(97, privateKey);
            const result = await sdk.walletBalance();
            console.log(result)
            expect(typeof result).toBe('string')
        })
    })

    describe('.apy()', () => {

        it('should return array of apys', async () => {
            const sdk = new XF(56, privateKey, { env: "mainnet" })
            const ee = await sdk.getClientAddress()
            console.log(ee)
            const result = await sdk.apys();
            console.log(result, 'kj')
            expect(typeof result).toBe("object")
        })
    })




})