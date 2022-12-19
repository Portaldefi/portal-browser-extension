import React from 'react';
import { Checkbox, Grid, Header } from 'semantic-ui-react';

interface ITransactionItem {
  tx: any
};

const shortenString = (str: string) => {
  return str.substring(0, 6) + '...' + str.substring(str.length - 3);
};

const dateToString = (dat: Date) => {
  return dat.getFullYear() + '-' + (dat.getMonth() + 1) + '-' + dat.getDate();
}

export default ({tx}: ITransactionItem) => {
  console.log(tx);
  return (
    <Grid className='p-16 py-9 bg-white'>
      <Grid.Column width='eleven' textAlign='left'>
        <Header as='p' className='description'>{shortenString(tx.txid)}</Header>
        <Header as='p' className='description'>{dateToString(new Date(tx.status.block_time))}</Header>
      </Grid.Column>
      <Grid.Column width='five' verticalAlign='middle'>
        <Header as='p' className='description'>{tx.status.confirmed === true ? "Confirmed" : "Unconfirmed"}</Header>
        <Header as='p' className='description'>{tx.vout[1].value - tx.vout[0].value}</Header>
      </Grid.Column>
    </Grid>
  )
}