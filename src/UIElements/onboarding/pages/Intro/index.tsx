import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Image, Button, Grid, Segment, Icon } from 'semantic-ui-react';

export default () => {
  const navigate = useNavigate();

  const handleContinue = useCallback(() => {
    navigate('/select-action');
  }, []);
  const handleBack = useCallback(() => {
    navigate('/welcome')
  }, []);

  return (
    <Segment className='board'>
      <Grid>
        <Grid.Row centered>
          <Header size='medium' className='heading'>Our Values</Header>
        </Grid.Row>
        <Grid.Row centered columns={2}>
          <Grid.Column>
            <Grid.Row centered>
              <Header size='medium' className='heading'>Censorship-resistant</Header>
              <Header as='p' size='small' color='grey' className='description'>Using Fabric, we enable web scale, serverless infrastructure with strong privacy and security guarantees.</Header>
              <Image src='/images/onboarding/black-glasses.png' />
            </Grid.Row>
          </Grid.Column>

          <Grid.Column>
            <Grid.Row centered>
              <Header size='medium' className='heading'>Freedom</Header>
              <Header as='p' size='small' color='grey' className='description'>Fabric, the underlying protocol Portal uses extends Bitcoin’s functionality today without needing any BIPs.</Header>
              <Image src='/images/onboarding/portal.png' />
            </Grid.Row>
            
          </Grid.Column>

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