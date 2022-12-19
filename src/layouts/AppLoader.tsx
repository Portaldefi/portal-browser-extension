import React from 'react';
import { HashRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Menu from './Menu';
import Board from './Board';
import Home from '../pages/Home';
import ConnectionView from '../pages/ConnectionView';
import Settings from '../pages/Settings';
import Network from '../pages/Settings/Network';
import AccessNotification from '../pages/Notifications/Access';

const AppLoader = () => {
  return (
    <Container className='App'>
      <Router>
        <Routes>
          <Route path='' element={<Navigate to='home' replace />} />
          <Route path='' element={<Menu />}>
            <Route path='home' element={<Home />} />
            <Route path='notification' element={<AccessNotification />} />
            <Route path='' element={<Board />}>
              <Route path='connection-detail' element={<ConnectionView />} />
              <Route path='settings' element={<Settings />} />
              <Route path='settings/network' element={<Network />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </Container>
  );
}

export default AppLoader;
