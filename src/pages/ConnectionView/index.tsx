import React from 'react';
import { 
  // Button, 
  Grid, Header } from 'semantic-ui-react';

import ConnectionHistory from '../../components/Home/ConnectionHistory';

export default () => {
  return (
    <Grid>
      <Grid.Row centered>
        <Header as='h1' className='heading'>Grove Chat</Header>
      </Grid.Row>
      <Grid.Row stretched centered>
        <ConnectionHistory />
      </Grid.Row>
    </Grid>
  );
}