import React from 'react';
import { useParams } from 'react-router-dom';
import IdentityItem from './IdentityItem';
import { Grid, Header, List } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import ChainItem from './ChainItem';
import chains from '@/config/chains';
import { setIdentityCheckState } from '@/slices/keySlice';
import { IChainState } from '@/types/chainstate';
import { setDBIdentityCheckState } from '@/serviceworker/database';

export default () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const identityId = parseInt(id!);
    const identity = useAppSelector(state => state.key.identity[identityId]);

    const handleSetCheckState = (chainId: number, check: boolean) => {
        const state = { identity: identityId, chain: chainId, state: check } as IChainState;
        dispatch(setIdentityCheckState(state));
        console.log("check", identityId, chainId, check);
        setDBIdentityCheckState(0, identityId, chainId, check);
    };

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
                                        <ChainItem
                                            name={chains[index].name.toUpperCase()}
                                            comment={iChain.address}
                                            checked={iChain.allowed}
                                            handleSetCheckState={handleSetCheckState}
                                            index={index} />
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