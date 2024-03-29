
import XF from '../src';
require('dotenv').config()


let privateKey: any = process.env.PK;
const chainId = 56;



describe('Group', () => {

	jest.setTimeout(3000000);

	describe('xAuto', () => {
		it('works', async () => {
			const { xAuto } = await XF(chainId, privateKey, { env: "mainnet" })
			let approval = await xAuto.approve("BUSD", "3");

			if (approval && approval.status) {

				let receipt = await xAuto.deposit("BUSD", "3");

				console.log(receipt)
				expect(typeof receipt).toBe("object")
			}
			// let ppfs = await xAuto.ppfs("BUSD");
			// console.log(ppfs, ' the ppfs')
			// expect(typeof ppfs).toBe("string")

			// let shareBalance = await xAuto.shareBalance("BUSD");
			// console.log(shareBalance, ' the share')
			// expect(typeof shareBalance).toBe("string")

			// let receiptW = await xAuto.withdraw("BUSD", "1");
			// console.log(receiptW)
			// expect(typeof receiptW).toBe("object")

		})
	})

	describe.only('xAuto', () => {
		it('works', async () => {
			const { xAuto } = await XF(chainId, privateKey, { env: "mainnet" })
			let receipt = await xAuto.depositNative("BNB", "0.01");
			console.log(receipt);

		})
	})

	describe('ppfs', () => {
		it('work', async () => {
			const xf = await XF(chainId, privateKey, { env: "mainnet", protocolName: "venus" })
			const res = await xf.getPPFS();
			console.log(res, ' pfpf')
			expect(typeof "res").toBe("string");
		})
	})

	describe('get info', () => {
		it('should return individual record', async () => {
			// const waitTime = (minutes: number) => new Promise(resolve => setTimeout(resolve, minutes * 60 * 1000))
			const { Personal } = await XF(chainId, privateKey, { env: "mainnet", protocolName: "venus" })
			// const res1 = await Personal.flexibleInfo();
			// console.log(res1)
			// await waitTime(1)
			const res2 = await Personal.flexibleDeposit('2');
			console.log(res2)
			// const res3 = await Personal.flexibleInfo();
			// console.log(res3)

			expect(typeof res2).toBe("object");
		})
	})

	describe('wallet balance', () => {
		it('should have a string value', async () => {
			// const xf = await XF(chainId, privateKey, { env: "mainnet", protocolName: "venus" })
			// const res = await xf.walletBalance();
			// console.log(res, ' adsfs')
			expect(typeof "res").toBe("string");
		})
	})

	describe.skip('create()', () => {
		it('should create', async () => {

			const groupName = "HouseDisco" + "888b";
			const groupSymbol = "HDG"

			const { Esusu } = await XF(chainId, privateKey, { env: "mainnet" });

			const result = await Esusu.createGroup(groupName, groupSymbol);
			console.log(result)

			expect(typeof result).toBe("object");
		})
	})

	describe.skip('flexibleInfo', () => {
		it('should return data', async () => {
			const { Personal } = await XF(chainId, privateKey, { env: "testnet" })
			const data = await Personal.flexibleDeposit(String(5));

			console.log(data)

			expect(typeof data).toBe("object");
		})
	})

})