import { checkChainId, formatAmount } from "../../utils/helpers"
import privateKeyToAddress from "../../utils/privateKeyToAddress"
import sendSignedTransaction from "../../utils/sendSignedTransaction"
import createContract from "../create.contract"

export default class xVault {
	protocol = "xVault"

	chainId: number
	rpc: string
	pk: string
	assets?: any[]

	constructor(
		chainId: number,
		pk: string,
		assets?: any[]
	) {
		this.chainId = chainId;
		let { url } = checkChainId(chainId);
		this.rpc = url;
		this.pk = pk;
		this.assets = assets;
	}


	async approve(tokenName: string, amount: string) {

		try {
			let res = this.filterToken(tokenName, this.chainId, this.protocol);
			if (!res) throw 'no token found'

			const approvalAmount = formatAmount(amount, this.chainId, tokenName);
			const contract = createContract(this.rpc, res.tokenAbi, res.tokenAddress);
			const tx = await contract.methods.approve(res.protocolAddress, approvalAmount);
			const receipt = await sendSignedTransaction(this.pk, this.rpc, tx, res.tokenAddress);

			return receipt;

		} catch (e) {
			console.log(e)
			return null
		}
	}

	async deposit(tokenName: string, amount: string) {

		let res = this.filterToken(tokenName, this.chainId, this.protocol);
		if (!res) throw 'no token found'

		const contract = createContract(this.rpc, res.protocolAbi, res.protocolAddress);

		try {

			let depositAmount = formatAmount(amount, this.chainId, tokenName);
			const tx = await contract.methods['deposit'](depositAmount);
			const receipt = await sendSignedTransaction(this.pk, this.rpc, tx, res.protocolAddress);

			return receipt;

		} catch (e) {
			console.log(e)
			return null
		}
	}

	async withdraw(tokenName: string, amount: string) {

		let res = this.filterToken(tokenName, this.chainId, this.protocol);
		if (!res) throw 'no token found'

		try {
			const contract = createContract(this.rpc, res.protocolAbi, res.protocolAddress);

			const client = privateKeyToAddress(this.rpc, this.pk)

			let share = await contract.methods['balanceOf'](client).call();
			const ppfs = await contract.methods[res.ppfsMethod]().call();

			let divisor = Math.pow(10, res.widthdrawDecimals);

			// @ts-ignore
			const totalDeposit = (Number(share) * Number(ppfs)) / Number(BigInt(divisor).toLocaleString('fullwide', { useGrouping: false }))

			let withdrawAmount: any = (Number(share) * Number(amount)) / totalDeposit;

			withdrawAmount = Math.trunc(withdrawAmount);

			const tx = contract.methods['withdraw'](String(withdrawAmount), client, 0)

			const receipt = await sendSignedTransaction(this.pk, this.rpc, tx, res.protocolAddress)

			return receipt;


		} catch (e) {
			console.error(e);
			return null
		}
	}

	async ppfs(tokenName: string) {
		try {

			let res = this.filterToken(tokenName, this.chainId, this.protocol);
			if (!res) throw 'no token found'

			const contract = createContract(this.rpc, res.protocolAbi, res.protocolAddress);
			const ppfs = await contract.methods[res.ppfsMethod]().call();

			return ppfs;
		} catch (e) {
			console.error(e)
			return null
		}
	}

	async shareBalance(tokenName: string) {
		try {

			let res = this.filterToken(tokenName, this.chainId, this.protocol);
			if (!res) throw 'no token found'

			const contract = createContract(this.rpc, res.protocolAbi, res.protocolAddress);

			const client = privateKeyToAddress(this.rpc, this.pk)
			const balance = await contract.methods['balanceOf'](client).call();

			return balance;

		} catch (e) {
			console.error(e);
			return null
		}
	}



	//
	filterToken(
		tokenName: string,
		network: number,
		protocol: string) {

		const result = this.assets?.filter(x => x.name === tokenName && x.network == network && x.protocolName == protocol)

		if (result?.length === 0) return null;

		return result && result[0]
	}

}