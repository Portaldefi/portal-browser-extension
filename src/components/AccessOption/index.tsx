import React from 'react';
import { Checkbox, Grid, Header, Radio } from 'semantic-ui-react';

interface IConnectionItem {
  name: string,
  comment: string
};

export default ({name, comment}: IConnectionItem) => {
  return (
    <Grid className='p-16 py-5 bg-white'>
      <Grid.Column width='eleven' textAlign='left'>
        <p className='font-family-Inter font-weight-400 font-size-14 line-height-17'>{name}</p>
      </Grid.Column>
      <Grid.Column width='five' verticalAlign='middle'>
        <Radio />
      </Grid.Column>
    </Grid>
  )
}