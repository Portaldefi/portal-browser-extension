import React, { useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button, Grid, Header, Icon } from 'semantic-ui-react';

export default () => {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate('/home');
  }, []);

  return (
    <div className='mainframe'>
      <Grid>
        <Grid.Row centered className='p-none'>
          <Button className='blank-button' onClick={handleBack}><Icon name='angle left' />Back</Button>
        </Grid.Row>
        <Grid.Row centered className='p-none'>
          <Outlet />
        </Grid.Row>
      </Grid>
    </div>
  );
}