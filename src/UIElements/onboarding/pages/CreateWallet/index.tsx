import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Button, Grid, Segment, Icon, Form } from 'semantic-ui-react';

export default () => {
  const [passData, setPassData] = useState({
    password: '',
    confPass: ''
  });
  const { password, confPass } = passData;
  const onChange = (e: any) => {
    setPassData({ ...passData, [e.target.name]: e.target.value });
  }


  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate('/select-action');
  }, []);

  const handleConfirm = useCallback(() => {
    if (password === '') {
      alert('Input Password!');
      return;
    }
    if (password !== confPass) {
      alert('Passwords don\'t match');
      return;
    }
    navigate('/seed-phrase-intro', { state: { mode: 'create' } });
  }, [password, confPass]);

  return (
    <Segment className='board'>
      <Grid>
        <Grid.Row centered>
          <Header size='medium' className='heading'>Create Password</Header>
        </Grid.Row>
        <Grid.Row centered>
          <Form className='form-container'>
            <Form.Group inline widths={1}>
              <Form.Input label="Password" width={8} type='password' name='password' value={password} onChange={onChange} />
            </Form.Group>
            <Form.Group inline widths={1}>
              <Form.Input label="Confirm" width={8} type='password' name='confPass' value={confPass} onChange={onChange} />
            </Form.Group>
          </Form>
        </Grid.Row>
        <Grid.Row>
          <Header as='p' size='small' color='grey' className='description extra-former-blank extra-latter-blank'>
            WARNING: Improper backup of the seed phrase will result in loss of funds!
          </Header>
        </Grid.Row>
        <Grid.Row centered columns={2}>
          <Grid.Column>
            <Button className='blank-button' onClick={handleBack}><Icon name='angle left' />Back</Button>
          </Grid.Column>
          <Grid.Column>
            <Button className='primary-button' onClick={handleConfirm}>Confirm</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}