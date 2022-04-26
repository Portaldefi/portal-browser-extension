import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Grid, Header, Segment } from 'semantic-ui-react';

import { setItems } from '../../slices/menuSlice';
import { setSRFLength, setSRFList } from '../../slices/phraseSlice';
import { useAppDispatch } from '../../hooks';

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

  const handleCreate = useCallback(() => {
    // TODO: Backend interaction
    dispatch(setSRFLength(12));
    dispatch(setSRFList([
      'minor', 'regret', 'daring', 'perfect', 'tenant', 'surge', 'they', 'section', 'mobile', 'bottom', 'vacant', 'cheese'
    ]));

    navigate('/seed-phrase-intro');
  }, []);
  
  return (
    <Segment size='big'>
      <Header size='large' as='h1'>Create Password</Header>
      <Grid centered columns={1}>
        <Grid.Column width='eight'>
          <Form onSubmit={handleCreate}>
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
              Create
            </Form.Button>
          </Form>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}