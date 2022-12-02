import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, Grid, Header } from 'semantic-ui-react';

export default () => {
  const [params, setParams] = useState({
    address: '',
    amount: 0
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

  return (
    <Grid className='w-100'>
      <Grid.Row centered className='p-none pb-19'>
        <Header as='h1' className='heading'>Transaction Details</Header>
      </Grid.Row>
      <Grid.Row centered>
      </Grid.Row>
    </Grid >
  );
}