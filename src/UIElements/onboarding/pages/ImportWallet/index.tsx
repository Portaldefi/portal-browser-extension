import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Grid, Header, Segment } from 'semantic-ui-react';

import { setItems } from '../../slices/menuSlice';
import { setSRFLength, setSRFList } from '../../slices/phraseSlice';
import { useAppDispatch } from '../../hooks';

const phraseOptions = [
  {
    key: '12-key',
    text: 'I have 12-word phrase',
    value: '12-key',
  },
  {
    key: '15-key',
    text: 'I have 15-word phrase',
    value: '15-key',
  },
  {
    key: '18-key',
    text: 'I have 18-word phrase',
    value: '18-key',
  },
  {
    key: '21-key',
    text: 'I have 21-word phrase',
    value: '21-key',
  },
  {
    key: '24-key',
    text: 'I have 24-word phrase',
    value: '24-key',
  },
]

export default () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setItems([
      {
        title: 'Back',
        link: '/select-action',
      }
    ]));
  }, []);

  const handleImport = useCallback(() => {
    navigate('/congrats');
  }, []);
  
  return (
    <Segment size='big'>
      <Header size='large' as='h1'>Import a wallet with Secret Recovery Phrase</Header>
      <Grid centered columns={1}>
        <Grid.Column width='ten'>
          <div>Only the first account on this wallet will auto load. After completing this process, to add additional accounts, click the drop down menu, then select Create Account.</div>
          <Form onSubmit={handleImport}>
            <Form.Field>
              <Form.Dropdown label='Secret Recovery Phrase' selection options={phraseOptions} />
            </Form.Field>
            <Form.Group>
              <Form.Input size='big' type='password' />
              <Form.Input size='big' type='password' />
              <Form.Input size='big' type='password' />
            </Form.Group>
            <Form.Group>
              <Form.Input size='big' type='password' />
              <Form.Input size='big' type='password' />
              <Form.Input size='big' type='password' />
            </Form.Group>
            <Form.Group>
              <Form.Input size='big' type='password' />
              <Form.Input size='big' type='password' />
              <Form.Input size='big' type='password' />
            </Form.Group>
            <Form.Group>
              <Form.Input size='big' type='password' />
              <Form.Input size='big' type='password' />
              <Form.Input size='big' type='password' />
            </Form.Group>
            <Form.Field>
              <Form.Input label='New password (8 characters min)' size='big' type='password' />
            </Form.Field>
            <Form.Field>
              <Form.Input label='Confirm password' size='big' type='password' />
            </Form.Field>
            <Form.Field>
              <Form.Checkbox label={{children: <div>I have read and agree to the <a>Terms of Use</a></div>}} />
            </Form.Field>
            <Form.Button type='submit' size='large' color='blue'>
              Import
            </Form.Button>
          </Form>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}