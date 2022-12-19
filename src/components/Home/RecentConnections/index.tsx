import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Header, List } from 'semantic-ui-react';

import ConnectionItem from './ConnectionItem';

export default () => {
  const navigate = useNavigate();

  const handleClickConnection = useCallback(() => {
    navigate('/connection-detail')
  }, []);

  return (
    <Grid className='recent-connection'>
      <Grid.Row>
        <Header as='p' className='subtitle p-16 py-9'>Recent Connections</Header>
      </Grid.Row>
      <Grid.Row className=''>
        <List className='w-100'>
          <List.Item onClick={handleClickConnection}>
            <List.Content>
              <ConnectionItem name='Grove Chat' comment='https://grove.chat/  -  Tue, Apr. 26, 2022 5:00 am' />
            </List.Content>
          </List.Item>
          <List.Item onClick={handleClickConnection}>
            <List.Content>
              <ConnectionItem name='Uniswap Exchange' comment='https://uniswap.org/  -  Mon, Apr. 25, 2022 8:00 pm' />
            </List.Content>
          </List.Item>
          <List.Item onClick={handleClickConnection}>
            <List.Content>
              <ConnectionItem name='Token Rank' comment='https://tokenrank.ai/  -  Friday, Apr. 20, 2022 3:00 pm' />
            </List.Content>
          </List.Item>
        </List>
      </Grid.Row>
    </Grid>
  )
}