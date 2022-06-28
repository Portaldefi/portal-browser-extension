import React, { useEffect } from 'react';
import { Grid, Header } from 'semantic-ui-react';

import { RETRIEVE_ACCOUNT, RuntimeMessage } from '@/config/messages';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setKeys } from '../../slices/keySlice';
import { cutter } from '../../../utils/text';
import RecentConnections from '../../components/Home/RecentConnections';

export default () => {
  // const [address, setAddress] = useState<string>('');
  const dispatch = useAppDispatch();
  const selectedAddress = useAppSelector(state => state.key.selectedAddress);
  
  useEffect(() => {
    const core = async () => {
      const syncStorage = await chrome.storage.session.get();
      const storage = await (new Promise(resolve => chrome.runtime.sendMessage({msg: RETRIEVE_ACCOUNT}, response => resolve(response))));
      dispatch(setKeys(syncStorage));
    }
    core();
  }, []);

  return (
    <div className='mainframe'>
      <Grid>
        <Grid.Row centered>
          {/* <Header as='h1' className='description'>Identity 1</Header> */}
        </Grid.Row>
        <Grid.Row centered>
          <Header as='p' className='description'>fabric{cutter(selectedAddress, 20)}</Header>
        </Grid.Row>
        <Grid.Row stretched centered>
          <RecentConnections />
        </Grid.Row>
      </Grid>
    </div>
  );
}
