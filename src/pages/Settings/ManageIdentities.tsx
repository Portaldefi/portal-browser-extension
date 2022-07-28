import React, { useCallback, useEffect } from 'react';
import {
  Grid, Header,
  List
} from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import ConnectionItem from '@/components/Home/RecentConnections/ConnectionItem'
import { useAppSelector } from '@/hooks';

export default () => {
  const identities = useAppSelector(state => state.key.identity);
  const navigate = useNavigate();


  console.log(identities);

  const handleClickConnection = useCallback(() => {
    navigate('/connection-detail')
  }, []);

  return (
    <Grid className='w-100'>
      <Grid.Row centered className='p-none pb-19'>
        <Header as='h1' className='heading'>Manage Identities</Header>
      </Grid.Row>

      <Grid.Row className='p-none'>
        <List className='w-100' style={{ height: "270px", overflowY: "scroll" }}>
          {
            identities.map((identity, index) =>
              <List.Item onClick={() => { }}>
                <List.Content>
                  <ConnectionItem name={"Identity" + index} comment={identity[0].address} />
                </List.Content>
              </List.Item>
            )
          }
        </List>
      </Grid.Row>
    </Grid>
  );
}