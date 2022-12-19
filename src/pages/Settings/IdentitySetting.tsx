import React from 'react';
import { useParams } from 'react-router-dom';
import IdentityItem from './IdentityItem';
import { Grid, Header, List } from 'semantic-ui-react';
import { useAppSelector } from '@/hooks';
import ChainItem from './ChainItem';
import chains from '@/config/chains';

export default () => {
    const { id } = useParams();
    const identity = useAppSelector(state => state.key.identity[parseInt(id!)]);

    console.log(identity);

    return (

        <Grid className='w-100'>
            <Grid.Row centered className='p-none pb-19'>
                <Header as='h1' className='heading'>Identity by Chains</Header>
            </Grid.Row>

            <Grid.Row className='p-none'>
                <List className='w-100' style={{ height: "270px", overflowY: "scroll" }}>
                    {
                        identity.map((iChain, index) => {
                            return (
                                <List.Item key={index}>
                                    <List.Content>
                                        <ChainItem name={chains[index].name.toUpperCase()} comment={iChain.address} />
                                    </List.Content>
                                </List.Item>
                            )
                        })
                    }
                </List>
            </Grid.Row>
        </Grid >
    )
}