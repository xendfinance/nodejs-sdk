import { Esusu, Group } from '../src';



let privateKey = process.env.PRIVATE_KEY

describe('Groups', () => {

    jest.setTimeout(300000)

    describe('.create()', () => {

        it('successfull returns correct name', async () => {
            const group = new Group(97, privateKey)
            const groupName = "Adex"
            const res = await group.create(groupName, 'ADX')
            expect(res.status).toBe(true)
        })
    })
})



describe('Esusu', () => {

    describe('.info()', () => {

        it('returns something:', async () => {

            const esusu = new Esusu(97, privateKey)
            const expectedResult = "1"
            const res = await esusu.info(1)
            expect(res.CycleId).toBe(expectedResult)
        })
    })


})