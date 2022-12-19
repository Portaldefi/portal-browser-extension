import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Checkbox, Grid, Header } from 'semantic-ui-react';

interface IIdentityItem {
  name: string,
  comment: string,
  checked: boolean,
  handleSetCheckState: any,
  index: number
};


export default ({ name, comment, checked, handleSetCheckState, index }: IIdentityItem) => {

  const [check, setCheck] = useState(true);

  useEffect(() => {
    setCheck(checked);
  }, []);

  const onChange = (e: SyntheticEvent, data: object) => {
    setCheck(!check);
    handleSetCheckState(index, !check);
  };

  return (
    <Grid className='p-16 py-9 bg-white'>
      <Grid.Column width='eleven' textAlign='left'>
        <Header as='p' className='description'>{name}</Header>
        <Header as='p' className='comment'>{comment}</Header>
      </Grid.Column>
      <Grid.Column width='five' verticalAlign='middle'>
        <Checkbox toggle checked={check} onChange={onChange} />
      </Grid.Column>
    </Grid>
  )
}