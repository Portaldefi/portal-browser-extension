import React, {useCallback, useState} from 'react';
import { useAppDispatch } from '@/hooks';
import { Grid, Header, Form, Button } from 'semantic-ui-react';
import { PasswordType } from '@/types/password';
import { checkPassword, changePassword } from '@/serviceworker/database';
import { useNavigate } from 'react-router-dom';


export default () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = useState<PasswordType>({
        password: '',
        confPass: '',
        oldPass: ''
    });
    
    const onChangePassInput = useCallback((e: any) => {
        setPassword({
            ...password,
            [e.target.name] : e.target.value
        })
    }, [password]);

    const handleConfirm = useCallback(async () => {
        if(password.password !== password.confPass)
            return alert('Input new password correctly!');

        let result = await checkPassword(0, password.oldPass);
        if(result === false) {
            alert('Old Password is incorrect!');
            return;
        }
        changePassword(0, password.password);
        
        alert('Password change success!');
        navigate('/home');
    }, [password]);

    return (

        <Grid className='w-100'>
            <Grid.Row centered className='p-none pb-19'>
                <Header as='h1' className='heading'>Change Password</Header>
            </Grid.Row>

            <Grid.Row centered>
                <Form.Group>
                    <label>Old Password</label>
                    <Form.Input width={8} type='password' name='oldPass' value={password.oldPass}
                        onChange={onChangePassInput}/>
                </Form.Group>
            </Grid.Row>
            <Grid.Row centered>
                <Form.Group>
                    <label>New Password</label>
                    <Form.Input width={8} type='password' name='password' value={password.password}
                        onChange={onChangePassInput}/>
                </Form.Group>
            </Grid.Row>
            <Grid.Row centered>
                <Form.Group>
                    <Form.Input width={8} type='password' name='confPass' value={password.confPass}
                        onChange={onChangePassInput}/>
                </Form.Group>
            </Grid.Row>
            <Grid.Row centered>
                <Button className='primary-button pwd-confirm' onClick={e => handleConfirm()}>Confirm</Button>
            </Grid.Row>
        </Grid >
    )
}