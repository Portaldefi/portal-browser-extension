import axios from 'axios';
import * as bitcoin from 'bitcoinjs-lib';

interface ITransaction {
	pubkey: string,
	address: string,
	wif: string,
	dest: string
}

const bitcoinNetwork = bitcoin.networks.testnet;

export const getBalanceFromTestNet = async (address: string) => {
	try {
		const res = await axios.get(`https://blockstream.info/testnet/api/address/${address}`);
		return res.data.chain_stats.funded_txo_sum;
	} catch (err) {
		console.log('error occured on fetching data');
		return 0;
	}
}

export const getTransactionHistory = async (address: string) => {
	try {
		const res = await axios.get(`https://mempool.space/testnet/api/address/tb1qh9rdah0fefhsuhj4v6h7znd85k4tyqz6vmrl56/txs`);
		return res.data;
	} catch (err) {
		console.log(err);
	}
}

export const makeTransaction = async ({pubkey, address, wif, dest}: ITransaction) => {
	/*try {
		var rootUrl = "https://api.blockcypher.com/v1/btc/test3";

		//get balance
		let res = await axios.get(rootUrl + "/addrs/" + address + "/balance");
		console.log(res);

		// send token from one wallet to another
		var key   = bitcoin.ECPair.fromWIF(source.wif, bitcoinNetwork);

		res = (await axios.get(rootUrl + "/addrs/" + address + "?unspentOnly=true")).data;
		let balance = res?.balance;
		let unconfirmed_balance = res?.unconfirmed_balance;
		if(unconfirmed_balance < 0)
			balance = balance + unconfirmed_balance;
		var tx = new bitcoin.TransactionBuilder(bitcoinNetwork);
		let txs = res?.txrefs;
		if (balance > 0 && txs) {
			txs.forEach(function(txn) {
				console.log(txn);
				tx.addInput(txn.tx_hash, txn.tx_output_n);
			});
			
			const res1 = (await axios.get("https://bitcoinfees.earn.com/api/v1/fees/recommended")).data;
			const price_per_byte = res1?.halfHourFee;
			let fee = (txs.length * 148 + 1 * 34 + 10) * price_per_byte;//1 is the no of outputs
			let amount_to_transfer = balance - fee;
			console.log("fee : " + fee + "\nBalance : " + amount_to_transfer);
			tx.addOutput(dest, amount_to_transfer);
			let txn_no = txs.length;
			while(txn_no > 0){
				tx.sign(txn_no-1, key);
				txn_no--;
			}
			let tx_hex = tx.build().toHex();
			const body = (await axios.post(rootUrl + "/txs/push",{json :{tx: tx_hex}})?.body;
			if(body.error)
				console.log(body.error);
			else 
				console.log(body.tx.hash);
		} else console.log("Not enough balance : " + balance);
	} catch (err) {
		console.log(err);
	}*/
}
