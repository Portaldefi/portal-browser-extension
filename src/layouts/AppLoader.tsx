import React from 'react';
import { MemoryRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Menu from './Menu';
import Board from './Board';
import Home from '../pages/Home';
import ConnectionView from '../pages/ConnectionView';
import Settings from '../pages/Settings';``

const AppLoader = () => {
  return (
    <Container className='App'>
      <Router>
        <Routes>
          <Route path='' element={<Navigate to='home' replace />} />
          <Route path='' element={<Menu />}>
            <Route path='home' element={<Home />} />
            <Route path='' element={<Board />}>
              <Route path='connection-detail' element={<ConnectionView />} />
              <Route path='settings' element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </Container>
  );
}

export default AppLoader;
