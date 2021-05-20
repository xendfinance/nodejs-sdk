import { Esusu, Group, Personal } from '../src';



let privateKey = "";



describe.skip('Personal', () => {


    describe('.flexibleDeposit()', () => {

        it('should happen successfully', async () => {
            const personal = new Personal(97, privateKey);
            const dep = await personal.flexibleDeposit("50");
            console.log(dep, ' the')
        })

    })

    describe.skip('.withdrawFlexible', () => {

        it('should withdraw success', async () => {
            const personal = new Personal(97, privateKey);
            const dep = await personal.withdrawFlexible("78");
            expect(dep.status).toBe(true);
        })
    })


})

describe('Groups', () => {

    jest.setTimeout(300000)

    describe.skip('.create()', () => {

        it('successfull returns correct name', async () => {
            const group = new Group(97, privateKey)
            const groupName = "Baker"
            const res = await group.create(groupName, 'BAK')
            expect(res.status).toBe(true)
        })
    })


    describe('.getGroups()', () => {

        it('returns array of groups', async () => {

            const group = new Group(97, privateKey);

            const res = await group.getGroups();

            console.log(res)

        })

    })

})



describe.skip('Esusu', () => {

    describe('.info()', () => {

        it('returns something:', async () => {

            const esusu = new Esusu(97, privateKey)
            const expectedResult = "1"
            const res = await esusu.info(1)
            expect(res.CycleId).toBe(expectedResult)
        })
    })


})