import React from 'react';
import { MemoryRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Menu from './Menu';
import Home from '../pages/Home';

const AppLoader = () => {
  return (
    <Container className='App'>
      <Router>
        <Routes>
          <Route path='' element={<Navigate to='home' replace />} />
          <Route path='' element={<Menu />}>
            <Route path='home' element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </Container>
  );
}

export default AppLoader;