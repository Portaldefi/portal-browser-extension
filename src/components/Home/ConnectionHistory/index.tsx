import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Header, List } from 'semantic-ui-react';

import HistoryItem from './HistoryItem';

export default () => {
  const navigate = useNavigate();

  const handleClickConnection = useCallback(() => {
    navigate('/connection-detail')
  }, []);

  return (
    <Grid className='recent-connection'>
      <Grid.Row>
        <Grid.Column width='ten' textAlign='left'>
          <Header as='p' className='subtitle p-16 py-9'>Last Connections</Header>
        </Grid.Column>
        <Grid.Column width='six' textAlign='right'>
          <Button className='blank-button'>Clear</Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className=''>
        <List className='w-100'>
          <List.Item onClick={handleClickConnection}>
            <List.Content>
              <HistoryItem url='https://grove.chat/' timestamp='Tue, Apr. 26, 2022 5:00 am' />
            </List.Content>
          </List.Item>
          <List.Item onClick={handleClickConnection}>
            <List.Content>
              <HistoryItem url='https://grove.chat/' timestamp='Sat, Apr. 23, 2022 8:30 am' />
            </List.Content>
          </List.Item>
          <List.Item onClick={handleClickConnection}>
            <List.Content>
              <HistoryItem url='https://grove.chat/' timestamp='Fri, Apr. 22, 2022 12:00 pm' />
            </List.Content>
          </List.Item>
        </List>
      </Grid.Row>
    </Grid>
  )
}