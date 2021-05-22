import { Cooperative, Esusu, Personal } from '../src';
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


    describe('.groups()', () => {
        it('should return data', async () => {
            const esusu = new Esusu(97, privateKey)
            const result = await esusu.getGroups();
            console.log(result)
            expect(typeof result).toBe("object")
        })
    })


})




// Cooperative Tests

describe('Cooperative', () => {

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

    describe.skip('.groups()', () => {
        it('should return object data', async () => {
            const cooperative = new Cooperative(97, privateKey)
            const result = await cooperative.groups();
            console.log(result)
            expect(typeof result).toBe("object");
        })
    })
})