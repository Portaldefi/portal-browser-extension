import React, { useEffect, useState } from 'react';
import Axios from 'axios';


export default ( address:any ) => {
  const [balance, setBalance] = useState('0');
  const req = 'https://blockstream.info/testnet/api/address/' + address.address;


  useEffect(() => {
    if(address){
      Axios.get('https://blockstream.info/testnet/api/address/'+address.address).then((response: any)=>{
        console.log("This is the balance ");
        console.log(req);
          console.log(response);
          setBalance(response.data.chain_stats.funded_txo_sum);
      }).catch(function(error){
        console.log(error.response.data);
      });
    }
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