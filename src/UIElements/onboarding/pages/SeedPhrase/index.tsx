import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Button, Grid, Segment, Form } from 'semantic-ui-react';

export default () => {
  const navigate = useNavigate();

  const handleContinue = useCallback(() => {
    navigate('/seed-phrase-restore');
  }, []);

  return (
    <Segment className='board'>
      <Grid>
        <Grid.Row centered>
          <Header size='medium' className='heading'>New Seed Phrase</Header>
        </Grid.Row>
        <Grid.Row centered>
          <Form className='form-container'>
            <Form.Group inline widths={3}>
              <Form.Input label="1." width={16} readOnly value='download' />
              <Form.Input label="2." width={16} readOnly value='portal' />
              <Form.Input label="3." width={16} readOnly value='defi' />
            </Form.Group>
            <Form.Group inline widths={3}>
              <Form.Input label="4." width={16} readOnly value='download' />
              <Form.Input label="5." width={16} readOnly value='portal' />
              <Form.Input label="6." width={16} readOnly value='defi' />
            </Form.Group>
            <Form.Group inline widths={3}>
              <Form.Input label="7." width={16} readOnly value='download' />
              <Form.Input label="8." width={16} readOnly value='portal' />
              <Form.Input label="9." width={16} readOnly value='defi' />
            </Form.Group>
            <Form.Group inline widths={3}>
              <Form.Input label="10." width={16} readOnly value='download' />
              <Form.Input label="11." width={16} readOnly value='portal' />
              <Form.Input label="12." width={16} readOnly value='defi' />
            </Form.Group>
          </Form>
        </Grid.Row>
        <Grid.Row>
          <Header as='p' size='small' color='grey' className='description extra-former-blank extra-latter-blank'>
            WARNING: Improper backup of the seed phrase will result in loss of funds!
          </Header>
        </Grid.Row>
        <Grid.Row centered columns={1}>
          <Grid.Column>
            <Button className='primary-button' onClick={handleContinue}>Continue</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}