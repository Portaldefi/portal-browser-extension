import React from 'react';
import { Button, Grid, Header, Icon, List } from 'semantic-ui-react';

import NetworkOption from '../../components/Settings/NetworkOption';

export default () => {
  return (
    <Grid className='w-100'>
      <Grid.Row centered className='p-none pb-19'>
        <Header as='h1' className='heading'>Settings</Header>
      </Grid.Row>
      <Grid.Row className='p-none'>
        <List className='w-100'>
          <List.Item>
            <List.Content>
              <NetworkOption name='Mainnet' comment='https://mainnet.com/  -  edit' />
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <NetworkOption name='Devnet' comment='https://devnet.com/  -  edit' />
            </List.Content>
          </List.Item>
        </List>
      </Grid.Row>
    </Grid>
  );
}