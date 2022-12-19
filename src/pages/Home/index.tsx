import React, { useEffect } from 'react';
import { Grid, Header } from 'semantic-ui-react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setKeys } from '../../slices/keySlice';
import { cutter } from '../../../utils/text';
import RecentConnections from '../../components/Home/RecentConnections';
import { getAccount } from '@/serviceworker/database';
import ChainSelector from '@/components/Home/ChainSelector';

export default () => {
  // const [address, setAddress] = useState<string>('');
  const dispatch = useAppDispatch();
  const selectedIdentityId = useAppSelector(state => state.key.selectedIdentityId);
  const selectedIdentity = useAppSelector(state => state.key.identity[selectedIdentityId]);
  const selectedChainId = useAppSelector(state => state.key.selectedChainId);


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
          <Header as='p' className='description'>fabric{cutter((selectedIdentity ? selectedIdentity[selectedChainId].address : ''), 20)}</Header>
        </Grid.Row>
        <Grid.Row stretched centered>
          <RecentConnections />
        </Grid.Row>
      </Grid>
    </div>
  );
}
