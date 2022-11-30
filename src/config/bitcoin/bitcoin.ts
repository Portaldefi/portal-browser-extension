import axios from 'axios';

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
