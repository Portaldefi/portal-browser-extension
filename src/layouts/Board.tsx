import React, { useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button, Grid, Icon } from 'semantic-ui-react';

export default () => {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate('/home');
  }, []);

  const handleLock = useCallback(() => {
    chrome.storage.sync.set({ authenticated: false });
    navigate('/login');
  }, []);

  return (
    <div className='mainframe'>
      <Grid>
        <Grid.Row centered className='p-none justify-between'>
          <Button className='blank-button' onClick={handleBack}><Icon name='angle left' />Back</Button>
          <Button className='blank-button' onClick={handleLock}>Lock <Icon name='sign-out' /></Button>
        </Grid.Row>
        <Grid.Row centered className='p-none'>
          <Outlet />
        </Grid.Row>
      </Grid>
    </div>
  );
}