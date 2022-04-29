import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Image, Button, Grid, Segment, Icon } from 'semantic-ui-react';

export default () => {
  const navigate = useNavigate();

  const handleContinue = useCallback(() => {
    navigate('/our-goal');
  }, []);
  const handleBack = useCallback(() => {
    navigate('/welcome')
  }, []);

  return (
    <Segment className='board'>
      <Grid>
        <Grid.Row centered>
          <Header size='medium' className='heading'>Enter the uncensorable internet</Header>
        </Grid.Row>
        <Grid.Row centered>
          <Header as='p' size='small' color='grey' className='description'>We enable peer-to-peer, decentralized, censorship-resistant applications as layers on Bitcoin. Using Fabric, we enable web scale, serverless infrastructure with strong privacy and security guarantees.</Header>
        </Grid.Row>
        <Grid.Row centered>
          <Image src='/images/onboarding/black-glasses.png' />
        </Grid.Row>
        <Grid.Row centered columns={2}>
          <Grid.Column>
            <Button className='blank-button' onClick={handleBack}><Icon name='angle left' />Back</Button>
          </Grid.Column>
          <Grid.Column>
            <Button className='primary-button' onClick={handleContinue}>Continue</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}