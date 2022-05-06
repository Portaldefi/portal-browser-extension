import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Header, Icon } from 'semantic-ui-react';

import SettingItem from '../../components/Home/SettingItem';

export default () => {
  const navigate = useNavigate();

  const handleNetwork = useCallback(() => {
    navigate('/settings/network');
  }, []);

  return (
    <Grid>
      <Grid.Row centered className='p-none pb-19'>
        <Header as='h1' className='heading'>Settings</Header>
      </Grid.Row>
      <Grid.Row className='p-none' onClick={handleNetwork}>
        <SettingItem name='Network' extra={<Header as='p' className='description'><u>mainnet</u></Header>} />
      </Grid.Row>
      <Grid.Row className='p-none'>
        <SettingItem name='Export Private Key' />
      </Grid.Row>
      <Grid.Row className='p-none'>
        <SettingItem name='Export Seed' />
      </Grid.Row>
      <Grid.Row className='p-none'>
        <SettingItem name='Import Identity' />
      </Grid.Row>
      <Grid.Row className='p-none'>
        <SettingItem name='Clear Identities' />
      </Grid.Row>
      <Grid.Row className='p-none'>
        <SettingItem name='Feedback' />
      </Grid.Row>
    </Grid>
  );
}