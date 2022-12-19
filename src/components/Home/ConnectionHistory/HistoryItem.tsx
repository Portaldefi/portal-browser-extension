import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

interface IConnectionItem {
  url: string,
  timestamp: string
};

export default ({ url, timestamp }: IConnectionItem) => {
  return (
    <Grid className='p-16 py-9 bg-white'>
      <Grid.Column width='sixteen' textAlign='left'>
        <Header as='p' className='description'>{url}</Header>
        <Header as='p' className='comment'>{timestamp}</Header>
      </Grid.Column>
    </Grid>
  )
}