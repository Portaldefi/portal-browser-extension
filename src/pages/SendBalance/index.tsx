import { makeTransaction } from '@/config/bitcoin/bitcoin';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, Grid, Header } from 'semantic-ui-react';

export default () => {
  const [params, setParams] = useState({
    address: '',
    amount: 0,
    message: ''
  });

  useEffect(() => {
  }, []);

  const onInputChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
    setParams({
      ...params,
      [e.target.name]: e.target.value
    })
  }, [params]);

  const onSendBalance = useCallback(() => {
    makeTransaction({
      pubkey: '',
      address: '',
      wif: '',
      dest: ''
    })
  }, []);

  return (
    <Grid className='w-100'>
      <Grid.Row centered className='p-none pb-19'>
        <Header as='h1' className='heading'>Send Balance</Header>
      </Grid.Row>
      <Grid.Row centered>
        <Form.Group>
          <label>Address to Receive</label>
          <Form.Input width={8} type='text' name='address' value={params.address} onChange={onInputChanged}/>
        </Form.Group>
      </Grid.Row>
      <Grid.Row centered>
        <Form.Group>
          <label>Amount to Send</label>
          <Form.Input width={8} type='number' name='amount' value={params.amount} onChange={onInputChanged}/>
        </Form.Group>
      </Grid.Row>
      <Grid.Row centered>
        <Form.Group>
          <label>Message</label>
          <Form.Input width={8} type='text' name='message' value={params.message} onChange={onInputChanged}/>
        </Form.Group>
      </Grid.Row>
      <Grid.Row centered>
        <Button className='primary-button pwd-confirm' onClick={onSendBalance}>Confirm</Button>
      </Grid.Row>
    </Grid >
  );
}
