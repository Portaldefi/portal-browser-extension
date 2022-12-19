import React from 'react';
import { Checkbox, Grid, Header } from 'semantic-ui-react';

interface IIdentityItem {
  name: string,
  comment: string
};

export default ({ name, comment }: IIdentityItem) => {
  return (
    <Grid className='p-16 py-9 bg-white'>
      <Grid.Column width='eleven' textAlign='left'>
        <Header as='p' className='description'>{name}</Header>
        <Header as='p' className='comment'>{comment}</Header>
      </Grid.Column>
    </Grid>
  )
}