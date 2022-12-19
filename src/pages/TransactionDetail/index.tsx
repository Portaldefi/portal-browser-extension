import { shortenString } from '@utils/helpers';
import { useAppSelector } from '@/hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Grid, Header } from 'semantic-ui-react';

export default () => {
  const transactions = useAppSelector(state => state.menu.transactions);
  const { id } = useParams();
  const txId = parseInt(id!);
  const tx = transactions[txId];

  useEffect(() => {

  }, []);

  return (
    <Grid className='w-100'>
      <Grid.Row centered className='p-none pb-19'>
        <Header as='h1' className='heading'>Transaction Details</Header>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column width='seven' textAlign='left'>
          <Header as='h4'>Hash: {shortenString(tx.status.block_hash)}</Header>
          <Header as='h4'>Conf: {tx.status.confirmed === true ? 'Confirmed' : 'Unconfirmed'}</Header>
          <Header as='h4'>In: {tx.vin[0].prevout.value}</Header>
          <Header as='h4'>Fee: {tx.fee}</Header>
        </Grid.Column>
        <Grid.Column width='five' textAlign='left'>
          <Header as='h4'>Sz: {tx.size}</Header>
          <Header as='h4'>-</Header>
          <Header as='h4'>Out: {tx.vout.reduce((a: any, b: any) => (a.value, b.value), 0)}</Header>
          <Header as='h4'>NO:{tx.vout.length}</Header>
        </Grid.Column>
      </Grid.Row>
    </Grid >
  );
}
