import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Header, List } from 'semantic-ui-react';
import ConnectionItem from './TransactionItem';
import { getTransactionHistory } from '../../../config/bitcoin/bitcoin';
import { useAppSelector } from '@/hooks';

export default () => {
  const navigate = useNavigate();
  const selectedIdentityId = useAppSelector(state => state.key.selectedIdentityId);
  const selectedIdentity = useAppSelector(state => state.key.identity[selectedIdentityId]);
  const selectedChainId = useAppSelector(state => state.key.selectedChainId);

  useEffect(() => {
    const core = async () => {
      const res = await getTransactionHistory(selectedIdentity[selectedChainId].address);
      console.log(res);
    }
    if(selectedIdentity && selectedIdentity[selectedChainId] && selectedIdentity[selectedChainId].address) core();
  }, [selectedIdentity, selectedChainId]);

  const handleClickConnection = useCallback(() => {
    navigate('/connection-detail')
  }, []);

  return (
    <Grid className='recent-connection'>
      <Grid.Row>
        <Header as='p' className='subtitle p-16 py-9'>Transaction History</Header>
      </Grid.Row>
      <Grid.Row className=''>
        <List className='w-100'>
        </List>
      </Grid.Row>
    </Grid>
  )
}