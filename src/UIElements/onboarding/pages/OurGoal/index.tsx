import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Image, Button, Grid, Segment, Icon } from 'semantic-ui-react';

export default () => {
  const navigate = useNavigate();

  const handleContinue = useCallback(() => {
    navigate('/select-action');
  }, []);
  const handleBack = useCallback(() => {
    navigate('/intro')
  }, []);

  return (
    <Segment className='board'>
      <Grid>
        <Grid.Row centered>
          <Header size='medium' className='heading'>Our Mission is to deliver freedom, one application at a time</Header>
        </Grid.Row>
        <Grid.Row centered>
          <Header as='p' size='small' color='grey' className='description'>Portal’s layer 2 and layer 3 atomic swap technology can be used for a general purpose market for data and computation. Our goal is to replace the web server model which is prone to centralization by design and architecture with a free market for data and computation. Fabric, the underlying protocol Portal uses extends Bitcoin’s functionality today without needing any BIPs.</Header>
        </Grid.Row>
        <Grid.Row centered>
          <Image src='/images/onboarding/portal.png' />
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