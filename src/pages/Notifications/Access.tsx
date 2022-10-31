import React from 'react';
import { Button, Grid, Header, 
  // Icon, 
  List } from 'semantic-ui-react';

import AccessOption from '../../components/AccessOption';

export default () => {

  const closeWindow = () => {
    window.close();
  }

  return (
    <div className='mainframe'>
      <Grid className='bg-white py-12'>
        <Grid.Row centered>
          <Header as='h1' className='title'>Grove Chat</Header>
          <p className='font-size-14 font-weight-400 line-height-17 font-family-Inter'>is requesting access to your Fabric Identity</p>
        </Grid.Row>
        <Grid.Row stretched centered>
          <div className='light-shadow p-16 py-9 w-100 font-family-Inter font-weight-400 bg-white'>
            <p className='font-size-12 line-height-15 text-align-left mb-3'>Website</p>
            <p className='font-size-14 line-height-17 text-align-left'>https://grove.chat/</p>
          </div>
          <div className='light-shadow p-16 py-9 w-100 font-family-Inter font-weight-400 bg-white'>
            <p className='font-size-12 line-height-15 text-align-left mb-3'>Fabric Identity</p>
            <p className='font-size-14 line-height-17 text-align-left'>fabricm3fuk238hJ3oawHIlk3wa4kjls</p>
          </div>
        </Grid.Row>
        <Grid.Row className='p-none'>
          <p className='font-family-Inter font-weight-400 font-size-12 line-height-15 px-16 m-none'>Allow access for</p>
          <List className='w-100'>
            <List.Item className='p-none'>
              <List.Content>
                <AccessOption name='This session' comment={''} />
              </List.Content>
            </List.Item>
            <List.Item className='p-none'>
              <List.Content>
                <AccessOption name='Indefinitely' comment={''} />
              </List.Content>
            </List.Item>
          </List>
        </Grid.Row>
        <Grid.Row centered columns={2}>
          <Grid.Column className='px-16'>
            <Button className='secondary-button' onClick={closeWindow}>Reject</Button>
          </Grid.Column>
          <Grid.Column className='px-16'>
            <Button className='primary-button' onClick={closeWindow}>Allow</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}