import React, { useState, useEffect } from 'react';
import { Image, Grid, GridRow, GridColumn, Form, Button } from 'semantic-ui-react';
import { CHECK_PASSWORD } from '@/config/messages';
import { useNavigate } from 'react-router-dom';

export default () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');

    const handleConfirm = () => {
        const core = async () => {
            chrome.runtime.sendMessage({ msg: CHECK_PASSWORD, payload: password }, response => {
                chrome.storage.local.get(['passwordCheck'], (res) => {
                    if (res.passwordCheck === true) {
                        navigate('/home');
                    }
                    else {
                        alert('Password incorrect!');
                    }
                })
            });
        }
        core();
        //checkPassword(0, password).then(res => console.log(res)); // 0 means account 0
    };

    return (
        <Grid>
            <GridRow id='menu' verticalAlign='middle'>
                <GridColumn width='three' floated='left'>
                    <Image className='logo' src='/icons/logo.png' size='mini' />
                </GridColumn>
                <GridColumn width='ten' textAlign='center'>
                </GridColumn>
                <GridColumn width='three' textAlign='right'>
                </GridColumn>
            </GridRow>
            <GridRow id='content'>
                <GridColumn width='sixteen'>
                    <div className='mainframe'>
                        <Grid>
                            <Grid.Row centered>
                                <h2>Welcome Back!</h2>
                            </Grid.Row>
                            <Grid.Row centered>
                                <h4>Input your wallet password</h4>
                            </Grid.Row>
                            <Grid.Row centered>
                                <Form.Group inline widths={1}>
                                    <Form.Input width={8} type='password' name='password' value={password} onChange={e => setPassword(e.target.value)} />
                                </Form.Group>
                            </Grid.Row>
                            <Grid.Row centered>
                                <Button className='primary-button pwd-confirm' onClick={e => handleConfirm()}>Confirm</Button>
                            </Grid.Row>
                        </Grid>
                    </div>
                </GridColumn>
            </GridRow>
        </Grid>
    );
}