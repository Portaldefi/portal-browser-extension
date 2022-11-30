import React, { useCallback } from 'react';
import {
  // Button, 
  Grid, Header,
  // Icon, 
  List
} from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import ConnectionItem from '../../components/Home/TransactionHistory/TransactionItem';

import NetworkOption from '../../components/Settings/NetworkOption';

export default () => {
  const navigate = useNavigate();

  const handleClickConnection = useCallback(() => {
    navigate('/connection-detail')
  }, []);

  return (
    <Grid className='w-100'>
      <Grid.Row centered className='p-none pb-19'>
        <Header as='h1' className='heading'>Settings</Header>
      </Grid.Row>

      <Grid.Row className='p-none'>
        <List className='w-100'>
          <List.Item onClick={handleClickConnection}>
            <List.Content>
              <ConnectionItem name='Bitcoin' comment='https://grove.chat/  -  Tue, Apr. 26, 2022 5:00 am' />
            </List.Content>
          </List.Item>
          <List.Item onClick={handleClickConnection}>
            <List.Content>
              <ConnectionItem name='Ethereum' comment='https://uniswap.org/  -  Mon, Apr. 25, 2022 8:00 pm' />
            </List.Content>
          </List.Item>
        </List>
      </Grid.Row>
    </Grid>
  );
}