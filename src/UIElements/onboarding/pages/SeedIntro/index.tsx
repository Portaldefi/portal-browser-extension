import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Image, Button, Grid, Segment, Icon } from 'semantic-ui-react';

export default () => {
  const navigate = useNavigate();

  const handleContinue = useCallback(() => {
    navigate('/seed-phrase');
  }, []);

  return (
    <Segment className='board'>
      <Grid>
        <Grid.Row centered>
          <Header size='medium' className='heading'>Create New Wallet</Header>
        </Grid.Row>
        <Grid.Row centered>
          <Header as='p' size='small' color='grey' className='description'>
            In the next screen you will be shown a 12 phrase seed that you must back up. It is best to perform the backup offline and privately, away from any stray eyes.
          </Header>
        </Grid.Row>
        <Grid.Row centered>
          <Header as='p' size='small' color='grey' className='description extra-latter-blank'>
            WARNING: Improper backup of the seed phrase will result in loss of funds as we will not be able to help you recover them.
          </Header>
        </Grid.Row>
        <Grid.Row centered columns={1}>
          <Grid.Column>
            <Button className='primary-button' onClick={handleContinue}>Continue</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}