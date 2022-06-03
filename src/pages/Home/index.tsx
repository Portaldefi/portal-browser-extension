import React, { useState, useEffect } from 'react';
import { Grid, Header } from 'semantic-ui-react';

import RecentConnections from '../../components/Home/RecentConnections';

export default () => {
  const [address, setAddress] = useState<string>('');
  
  useEffect(() => {
    const core = async () => {
      const syncStorage = await chrome.storage.session.get();
      setAddress(syncStorage.address);
    }
    core();
  }, []);

  return (
    <div className='mainframe'>
      <Grid>
        <Grid.Row centered>
          <Header as='h1' className='description'>Identity 1</Header>
        </Grid.Row>
        <Grid.Row centered>
          <Header as='p' className='description'>{address[0]}</Header>
        </Grid.Row>
        <Grid.Row stretched centered>
          <RecentConnections />
        </Grid.Row>
      </Grid>
    </div>
  );
}