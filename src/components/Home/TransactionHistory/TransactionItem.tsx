import React from 'react';
import { Checkbox, Grid, Header } from 'semantic-ui-react';

interface ITransactionItem {
  tx: any
};

export default ({tx}: ITransactionItem) => {
  console.log(tx);
  return (
    <Grid className='p-16 py-9 bg-white'>
      <Grid.Column width='eleven' textAlign='left'>
        <Header as='p' className='description'>{tx.vin[0].prevout.value}</Header>
      </Grid.Column>
      <Grid.Column width='five' verticalAlign='middle'>
        {tx.vout.map((row: any) => <Header as='p' className='description'>{row.value}</Header>)}
      </Grid.Column>
    </Grid>
  )
}