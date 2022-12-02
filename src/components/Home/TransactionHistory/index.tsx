import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Header, List } from 'semantic-ui-react';
import { getTransactionHistory } from '../../../config/bitcoin/bitcoin';
import { useAppSelector } from '@/hooks';
import TransactionItem from './TransactionItem';
import { useAppDispatch } from '@/hooks';
import { setTransactions } from '@/slices/menuSlice';

export default () => {
  const dispatch = useAppDispatch();
  const selectedIdentityId = useAppSelector(state => state.key.selectedIdentityId);
  const selectedIdentity = useAppSelector(state => state.key.identity[selectedIdentityId]);
  const selectedChainId = useAppSelector(state => state.key.selectedChainId);
  const [transactions, setTxs] = useState([]);

  useEffect(() => {
    const core = async () => {
      const res = await getTransactionHistory(selectedIdentity[selectedChainId].address);
      dispatch(setTransactions(res));
      setTxs(res);
    }
    if(selectedIdentity && selectedIdentity[selectedChainId] && selectedIdentity[selectedChainId].address) core();
  }, [selectedIdentity, selectedChainId]);

  const txContainer = transactions.map((tx, idx) => idx < 5 && <TransactionItem id={idx}/>);

  return (
    <Grid className='recent-connection'>
      <Grid.Row>
        <Header as='p' className='subtitle p-16 py-9'>Transaction History</Header>
      </Grid.Row>
      <Grid.Row className=''>
        <List className='w-100'>
          { txContainer }
        </List>
      </Grid.Row>
    </Grid>
  )
}