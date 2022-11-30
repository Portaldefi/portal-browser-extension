import React from 'react';
import { HashRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Menu from './Menu';
import Board from './Board';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ConnectionView from '../pages/ConnectionView';
import Settings from '../pages/Settings';
import Network from '../pages/Settings/Network';
import AccessNotification from '../pages/Notifications/Access';
import ManageIdentities from '@/pages/Settings/ManageIdentities';
import ManageChains from '@/pages/Settings/ManageChains';
import IdentitySetting from '@/pages/Settings/IdentitySetting';
import ChangePassword from '@/pages/Settings/ChangePassword';
import AddDuressKey from '@/pages/Settings/AddDuressKey';
import ExportSeedPhrase from '@/pages/Settings/ExportSeedPhrase';
import SendBalance from '@/pages/SendBalance';

const AppLoader = () => {
  return (
    <Container className='App'>
      <Router>
        <Routes>
          <Route path='' element={<Navigate to='login' replace />} />
          <Route path='login' element={<Login />} />
          <Route path='' element={<Menu />}>
            <Route path='home' element={<Home />} />
            <Route path='notification' element={<AccessNotification />} />
            <Route path='' element={<Board />}>
              <Route path='connection-detail' element={<ConnectionView />} />
              <Route path='send_balance' element={<SendBalance />} />
              <Route path='settings' element={<Settings />} />
              <Route path='settings/network' element={<Network />} />
              <Route path='settings/manage_identities' element={<ManageIdentities />} />
              <Route path='settings/add_duress_key' element={<AddDuressKey />} />
              <Route path='settings/manage_chains' element={<ManageChains />} />
              <Route path='settings/export_seedphrase' element={<ExportSeedPhrase />} />
              <Route path='settings/change_password' element={<ChangePassword />} />
              <Route path='settings/identity/:id' element={<IdentitySetting />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </Container>
  );
}

export default AppLoader;
