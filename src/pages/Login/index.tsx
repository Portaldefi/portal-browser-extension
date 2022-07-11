import React, { useState, useEffect } from 'react';
import { Image, Grid, GridRow, GridColumn, Form, Button } from 'semantic-ui-react';
import { CHECK_PASSWORD } from '@/config/messages';
import { useNavigate } from 'react-router-dom';

export default () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');

    useEffect(() => {
        chrome.storage.sync.get(['authenticated', 'auth_time'], (res) => {
            if (res.authenticated !== true)
                return;

            const auth_time = (new Date(res.auth_time)).getTime();
            const cur_time = (new Date(Date.now())).getTime();
            if (Math.abs(cur_time - auth_time) > 3600 * 1000) {
                //Auth time expired   
                chrome.storage.sync.set({ authenticated: false });
            }
            else
                navigate('/home');
        });
    }, []);

    const handleConfirm = () => {
        const core = async () => {
            chrome.runtime.sendMessage({ msg: CHECK_PASSWORD, payload: password }, response => {
                chrome.storage.local.get(['passwordCheck'], (res) => {
                    console.log(res.passwordCheck);
                    if (res.passwordCheck === true) {
                        //Authentication to session
                        chrome.storage.sync.set({ authenticated: true, auth_time: Date.now() });
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
// @ts-ignore
    const onKeyDown = (e) => {
        if (e.keyCode == 13) {
            handleConfirm();
        }
    }

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
                                    <Form.Input width={8} type='password' name='password' value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        onKeyDown={onKeyDown} />
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