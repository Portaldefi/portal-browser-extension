import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Image, Button, Grid, Segment } from 'semantic-ui-react';

export default () => {
  const navigate = useNavigate();

  const handleCreate = useCallback(() => {
    navigate('/create-wallet');
  }, []);
  const handleImport = useCallback(() => {
    navigate('/import-wallet');
  }, []);

  return (
    <Segment className='board'>
      <Grid>
        <Grid.Row centered>
          <Header size='medium' className='heading'>Connect Wallet</Header>
        </Grid.Row>
        <Grid.Row centered>
          <Header as='p' size='small' color='grey' className='description'>Every Portal wallet is created with a seed, we will create a </Header>
        </Grid.Row>
        <Grid.Row centered>
          <Image src='/images/onboarding/vault.png' />
        </Grid.Row>
        <Grid.Row centered columns={2}>
          <Grid.Column>
            <Button className='secondary-button' onClick={handleImport}>Import Seed</Button>
          </Grid.Column>
          <Grid.Column>
            <Button className='primary-button' onClick={handleCreate}>Create New Wallet</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}