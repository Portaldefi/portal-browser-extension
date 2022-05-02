import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

import RecentConnections from '../../components/Home/RecentConnections';

export default () => {
  return (
    <div className='mainframe'>
      <Grid>
        <Grid.Row centered>
          <Header as='h1' className='description'>Identity 1</Header>
        </Grid.Row>
        <Grid.Row centered>
          <Header as='p' className='description'>fabric28hoilalw3nmjkq8dfa8o3</Header>
        </Grid.Row>
        <Grid.Row stretched centered>
          <RecentConnections />
        </Grid.Row>
      </Grid>
    </div>
  );
}