import axios from 'axios';

export const getBalanceFromTestNet = async (address: any) => {
	try {
		const res = await axios.get('https://blockstream.info/testnet/api/address/' + address);
		alert(JSON.stringify(res));
		return res.data.chain_stats.funded_txo_sum;
	} catch (err) {
		console.log('error occured on fetching data');
		return 0;
	}
}