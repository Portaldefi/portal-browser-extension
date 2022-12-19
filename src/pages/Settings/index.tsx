import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Header, Icon } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addAddress } from '../../slices/keySlice';

import SettingItem from '../../components/Home/SettingItem';
import { generateAddress } from '@utils/seedPhrase';

export default () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNetwork = useCallback(() => {
    navigate('/settings/network');
  }, []);

  const addIdentity = useCallback(() => {
    const core = async () => {
      if (confirm('Really Add an identity?') === true) {
        const address = await generateAddress();
        alert(address);
        dispatch(addAddress(address));
      }
      else {
        alert('Request Canceled!');
      }
    };
    core();
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
        <SettingItem name='Export Private Key' extra={undefined} />
      </Grid.Row>
      <Grid.Row className='p-none'>
        <SettingItem name='Export Seed' extra={undefined} />
      </Grid.Row>
      <Grid.Row className='p-none' onClick={addIdentity}>
        <SettingItem name='Add Identity' extra='undefined' />
      </Grid.Row>
      {/* <Grid.Row className='p-none'>
        <SettingItem name='Import Identity' />
      </Grid.Row> */}
      <Grid.Row className='p-none'>
        <SettingItem name='Clear Identities' extra={undefined} />
      </Grid.Row>
      <Grid.Row className='p-none'>
        <SettingItem name='Feedback' extra={undefined} />
      </Grid.Row>
    </Grid>
  );
}
