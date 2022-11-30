import React, {useCallback, useState} from 'react';
import { useAppDispatch } from '@/hooks';
import { Grid, Header, Form, Button } from 'semantic-ui-react';


export default () => {
    const handleMore = useCallback(async () => {
    }, []);

    return (
        <Grid className='w-100'>
            <Grid.Row centered className='p-none pb-19'>
                <Header as='h1' className='heading'>Transaction History</Header>
            </Grid.Row>

            <Grid.Row centered>
                <Button className='primary-button pwd-confirm' onClick={e => handleMore()}>More</Button>
            </Grid.Row>
        </Grid >
    )
}