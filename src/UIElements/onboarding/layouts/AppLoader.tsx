import React from 'react';
import { HashRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Welcome from '../pages/Welcome';

const AppLoader = () => {
  return (
    <Container className='App'>
      <Router>
        <Routes>
          <Route path='' element={<Navigate to='welcome' replace />} />
          <Route path='welcome' element={<Welcome />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default AppLoader;