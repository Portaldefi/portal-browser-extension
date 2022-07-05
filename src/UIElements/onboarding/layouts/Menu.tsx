import React, { useCallback } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Menu, Image, Grid, GridRow, GridColumn } from 'semantic-ui-react';

import { useAppSelector } from '../hooks';
import { RootState } from '../store';
import { IMenuItem } from '../types/menu';

const MenuItem = Menu.Item;

export default () => {
  const navigate = useNavigate();
  const menuItems = useAppSelector((state: RootState) => state.menu.items);

  const handleMenuClick = useCallback((item: IMenuItem) => {
    if (item.external) { }
    else {
      navigate(item.link);
    }
  }, []);

  const renderMenuItem = useCallback((item: IMenuItem, idx: number) => (
    <MenuItem as='a' key={idx} onClick={() => handleMenuClick(item)}>
      {item.title}
    </MenuItem>
  ), []);

  return (
    <Grid>
      <GridRow>
        <GridColumn width='sixteen'>
          <Menu inverted size='massive'>
            <MenuItem header>
              <Image className='app-logo' src="https://portaldefi.com/assets/portal-logo.gif" alt="Portal Logo" />
              DeIdentity
            </MenuItem>
            {menuItems.map(renderMenuItem)}
          </Menu>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn width='sixteen'>
          <Outlet />
        </GridColumn>
      </GridRow>
    </Grid>
  )
}