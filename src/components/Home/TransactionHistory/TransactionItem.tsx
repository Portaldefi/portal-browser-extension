import React from 'react';
import { Checkbox, Grid, Header } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks';
import { dateToString, shortenString } from '@/common/helpers';

interface ITransactionItem {
  id: number
};

export default ({ id }: ITransactionItem) => {
  const transactions = useAppSelector(state => state.menu.transactions);
  const tx = transactions[id];
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/transaction_detail/${id}`);
  };

  console.log(tx);
  return (
    <Grid className='p-16 py-9 bg-white' onClick={handleClick}>
      <Grid.Column width='eleven' textAlign='left'>
        <Header as='p' className='description'>{shortenString(tx.txid)}</Header>
        <Header as='p' className='description'>{dateToString(new Date(tx.status.block_time))}</Header>
      </Grid.Column>
      <Grid.Column width='five' verticalAlign='middle'>
        <Header as='p' className='description'>{tx.status.confirmed === true ? "Confirmed" : "Unconfirmed"}</Header>

      </Grid.Column>
    </Grid>
  )
}