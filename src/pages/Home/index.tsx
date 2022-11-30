import React, { useEffect, useState } from 'react';
import { Button, Grid, Header, Icon } from 'semantic-ui-react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setKeys } from '../../slices/keySlice';
import { cutter } from '../../../utils/text';
import TransactionHistory from '../../components/Home/TransactionHistory';
import { getAccount } from '@/serviceworker/database';
import ChainSelector from '@/components/Home/ChainSelector';
import AccountBalance from '../../components/Home/AccountBalance';
import { useNavigate } from 'react-router-dom';

export default () => {
  const navigate = useNavigate();
  // const [address, setAddress] = useState<string>('');
  const dispatch = useAppDispatch();
  const selectedIdentityId = useAppSelector(state => state.key.selectedIdentityId);
  const selectedIdentity = useAppSelector(state => state.key.identity[selectedIdentityId]);
  const selectedChainId = useAppSelector(state => state.key.selectedChainId);
  const [address, setAddress] = useState('NoAddress');

  useEffect(() => {
    const core = async () => {
      const syncStorage = await chrome.storage.session.get();

      getAccount().then(result => {
        // @ts-ignore
        dispatch(setKeys(result));
      });
    }
    core();
  }, []);

  const handleSendBalance = () => {
    navigate('/send_balance');
  }

  return (
    <div className='mainframe'>
      <Grid>
        <Grid.Row centered>
          <Header as='h1' className='description home-header'>
            Identity {selectedIdentityId}
            <ChainSelector />
          </Header>
        </Grid.Row>
        <Grid.Row centered>
        </Grid.Row>
        <Grid.Row centered>
          <Header as='p' className='description'>fabric{cutter((selectedIdentity ? selectedIdentity[selectedChainId].address : ''), 20)}</Header>
          <AccountBalance address={(selectedIdentity ? selectedIdentity[selectedChainId].address : '')} />
        </Grid.Row>
        <Grid.Row centered>
          <Button icon inverted color='red' style={{width:'50px'}} onClick={handleSendBalance}>
            <Icon name='world' />
          </Button>
        </Grid.Row>
        <Grid.Row stretched centered>
          <TransactionHistory />
          {/* {selectedIdentity[selectedChainId].address} */}
        </Grid.Row>
      </Grid>
    </div>
  );
}
