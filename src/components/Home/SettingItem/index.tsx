import React, { ReactNode } from 'react';
import { Grid, Header } from 'semantic-ui-react';

interface ISettingItem {
  name: string,
  extra: ReactNode | string | undefined;
};

export default ({name, extra}: ISettingItem) => {
  return (
    <Grid className='p-16 py-12 bg-white w-100'>
      <Grid.Column width='eleven' textAlign='left'>
        <Header as='p' className='description'>{name}</Header>
      </Grid.Column>
      <Grid.Column width='five' textAlign='right'>
        { extra }
      </Grid.Column>
    </Grid>
  )
}