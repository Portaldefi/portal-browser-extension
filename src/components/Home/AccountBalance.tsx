import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getBalanceFromTestNet } from '@/config/bitcoin/bitcoin';
import { add } from 'lodash';


export default ( address:any ) => {
  const [balance, setBalance] = useState('0');
  const req = 'https://blockstream.info/testnet/api/address/' + address.address;

  useEffect(() => {
    const core = async () => {
      if(address.address && address.address !== ''){
        const res = await getBalanceFromTestNet(address.address) ;
        setBalance(res);
      }
    };
    core();
  }, [address]);


  return (
    <div>
      <div>Address</div>
      <div>{JSON.stringify(address.address)}</div>
      <div>Balance</div>
      <div>{JSON.stringify(balance)}</div>
    </div>
  );
}