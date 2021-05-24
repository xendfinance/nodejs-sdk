import XF, { Cooperative, Esusu, Personal } from '../src';
require('dotenv').config()


let privateKey = process.env.PK;



describe.skip('Personal', () => {


    jest.setTimeout(300000);
    describe('.flexibleDeposit()', () => {

        it('should happen successfully', async () => {
            const personal = new Personal(97, privateKey);
            const dep = await personal.flexibleDeposit("10");
            expect(typeof dep).toBe("object")
        })

    })

    describe('.withdrawFlexible', () => {

        it('should withdraw success', async () => {
            const personal = new Personal(97, privateKey);
            const dep = await personal.withdrawFlexible("15");
            expect(dep.status).toBe(true);
        })
    })


})




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
            const esusu = new Esusu(56, privateKey, { env: "live" })
            const result = await esusu.getGroups();
            console.log(result, ' from esusu')
            expect(typeof result).toBe("object")
        })
    })


    describe('.contributionsCount()', () => {
        it('should be a number', async () => {

            const esusu = new Esusu(56, privateKey, { env: "live" })
            const result = await esusu.contributionsCount();

            expect(typeof result).toBe("number");
        })
    })


    describe.skip('.contributions()', () => {
        it('should return an array', async () => {

            const esusu = new Esusu(56, privateKey, { env: "live" })
            const result = await esusu.contrubution();

            expect(typeof result).toBe("object");
        })
    })


    describe('.cyclesInGroup()', () => {

        it('should return an array', async () => {

            const esusu = new Esusu(56, privateKey, { env: "live" })
            const result = await esusu.cyclesInGroup(6);

            expect(typeof result).toBe('object');
        })
    })


})




// Cooperative Tests

describe.skip('Cooperative', () => {

    jest.setTimeout(300000);

    describe.skip('.createGroup()', () => {
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
            const cooperative = new Cooperative(56, privateKey, { env: "live" })
            const result = await cooperative.groups();
            console.log(result, ' from cooperative')
            expect(typeof result).toBe("object");
        })
    })
})



describe('General', () => {

    describe('.availableProtocols', () => {
        it('should return array of protocols', async () => {
            const sdk = new XF(56, privateKey);
            const result = sdk.availableProtocols;
            console.log(result)
            expect(typeof result).toBe('object')
        })
    })

})