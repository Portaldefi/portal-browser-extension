import React, { useCallback, useEffect, useState } from 'react';
import {
  Grid, Header,
  List
} from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { getGlobalChainState, setGlobalChainState } from '@/serviceworker/database';
import GlobalChainItem from './GlobalChainItem';
import chains from '@/config/chains';

export default () => {
  const navigate = useNavigate();
  const [chainState, setChainState] = useState([] as Array<boolean>);
  //console.log(identities);

  useEffect(() => {
    const core = async () => {
      const chainSettings = await getGlobalChainState() as Array<boolean>;
      setChainState(chainSettings);
    };

    core();
  }, []);

  const handleSetCheckState = useCallback((index: number, state: boolean) => {
    let chainTemp = chainState;
    chainTemp[index] = state;
    setChainState(chainTemp);

    setGlobalChainState(chainTemp);
  }, [chainState]);


  return (
    <Grid className='w-100'>
      <Grid.Row centered className='p-none pb-19'>
        <Header as='h1' className='heading'>Manage Chains</Header>
      </Grid.Row>

      <Grid.Row className='p-none'>
        <List className='w-100' style={{ height: "270px", overflowY: "scroll" }}>
          {
            chainState.map((state, index) => {
              console.log('inner', state, index);
              console.log(chainState);
              return <List.Item key={index}>
                <List.Content>
                  <GlobalChainItem
                    name={chains[index].name.toUpperCase()}
                    checked={chainState[index]}
                    handleSetCheckState={handleSetCheckState}
                    index={index} />
                </List.Content>
              </List.Item>
            })
          }
        </List>
      </Grid.Row>
    </Grid>
  );
}