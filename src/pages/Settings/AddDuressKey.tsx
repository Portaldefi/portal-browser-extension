import React, {useCallback, useState} from 'react';
import { useAppDispatch } from '@/hooks';
import { Grid, Header, Form, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';


export default () => {
    const [duressKey, setDuressKey] = useState<string>('');
    
    const onChangeDuressKeyInput = useCallback((e: any) => {
        setDuressKey(e.target.value)
    }, []);

    const handleAdd = useCallback(async () => {
        
    }, [duressKey]);

    return (
        <Grid className='w-100'>
            <Grid.Row centered className='p-none pb-19'>
                <Header as='h1' className='heading'>Add Duress Key</Header>
            </Grid.Row>

            <Grid.Row centered>
                <Form.Group>
                    <label>Duress Key</label>
                    <Form.Input width={8} type='password' name='duresskey' value={duressKey}
                        onChange={onChangeDuressKeyInput}/>
                </Form.Group>
            </Grid.Row>
            <Grid.Row centered>
                <Button className='primary-button pwd-confirm' onClick={e => handleAdd()}>Add</Button>
            </Grid.Row>
        </Grid >
    )
}