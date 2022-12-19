import { clearDatabase } from '../../../../serviceworker/database';
import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Image, Button, Grid, Segment } from 'semantic-ui-react';

const localforage = require('localforage');

export default () => {
  const navigate = useNavigate();

  useEffect(() => {
    clearDatabase();
  }, []);

  const handleContinue = useCallback(() => {
    navigate('/intro');
  }, []);

  return (
    <Segment className='board'>
      <Grid>
        <Grid.Row centered>
          <Header size='medium' className='heading'>Welcome to Portal</Header>
        </Grid.Row>
        <Grid.Row centered>
          <Header as='p' size='small' color='grey' className='description'>Your Gateway To Uncensorable Applications</Header>
        </Grid.Row>
        <Grid.Row centered>
          <Image src='/icons/logo.png' />
        </Grid.Row>
        <Grid.Row centered columns={1}>
          <Button className='primary-button' onClick={handleContinue}>Get Started</Button>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}