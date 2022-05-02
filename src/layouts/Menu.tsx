import React, { useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Image, Grid, GridRow, GridColumn, Icon } from 'semantic-ui-react';

import AccountSelector from '../components/Home/AccountSelector';

export default () => {
  const navigate = useNavigate();

  const handleClickSettings = useCallback(() => {
    navigate('/settings');
  }, []);

  return (
    <Grid>
      <GridRow id='menu' verticalAlign='middle'>
        <GridColumn width='three' floated='left'>
          <Image className='logo' src='/icons/logo.png' size='mini' />
        </GridColumn>
        <GridColumn width='ten' textAlign='center'>
          <AccountSelector />
        </GridColumn>
        <GridColumn width='three' textAlign='right'>
          <Icon name='setting' size='big' onClick={handleClickSettings} />
        </GridColumn>
      </GridRow>
      <GridRow id='content'>
        <GridColumn width='sixteen'>
          <Outlet />
        </GridColumn>
      </GridRow>
    </Grid>
  )
}
