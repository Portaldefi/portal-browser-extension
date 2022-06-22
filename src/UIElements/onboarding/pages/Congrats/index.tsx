import React, { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  // Form, 
  Grid, Header, Segment, Button, Image } from 'semantic-ui-react';

type LocationState = {
  state: {
    mode: string;
  }
}

export default () => {
  // @ts-ignore
  const location = useLocation<LocationState>();

  const { state: { mode: connectMode } } = location as LocationState;

  const handleFinish = useCallback(() => {
    window.location.replace('http://localhost:3000');
  }, []);

  useEffect(() => {
    chrome.action.setPopup({ popup: 'index.html?popup=true' });
  }, []);
  
  return (
    <Segment className='board'>
      <Grid>
        <Grid.Row centered>
          <Header size='medium' className='heading'>
            { connectMode === 'create'
              ? "Your Identity Is All Setup, Congratulations!"
              : "Welcome back!"
            }
          </Header>
        </Grid.Row>
        { connectMode === 'create'
        ? <>
            <Grid.Row centered>
              <Header as='p' size='small' color='grey' className='description'>
                You are now ready to connect to Fabric web applications. 
              </Header>
            </Grid.Row>
            <Grid.Row centered>
              <Header as='p' size='small' color='grey' className='description'>
                Remember to back up your seed in a secure location. 
              </Header>
            </Grid.Row>
          </>
        : <Grid.Row centered>
            <Header as='p' size='small' color='grey' className='description'>
              Your DeIdentity is now ready to connect to Fabric web applications.
            </Header>
          </Grid.Row>
        }
        <Grid.Row centered>
          <Image src='/images/onboarding/Congrats.png' />
        </Grid.Row>
        <Grid.Row centered columns={1}>
          <Grid.Column>
            <Button className='primary-button' onClick={handleFinish}>Finish</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}