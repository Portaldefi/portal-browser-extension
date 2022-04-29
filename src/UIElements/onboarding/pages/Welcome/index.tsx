import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Image, Button, Grid, Segment } from 'semantic-ui-react';

export default () => {
  const navigate = useNavigate();

  const handleStart = useCallback(() => {
    navigate('/select-action');
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
          <Button className='primary-button'>Continue</Button>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}