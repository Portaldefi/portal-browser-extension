import React from 'react';
import { HashRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Welcome from '../pages/Welcome';
import Intro from '../pages/Intro';
import OurGoal from '../pages/OurGoal';
import SelectAction from '../pages/SelectAction';
import ImportWallet from '../pages/ImportWallet';
import CreateWallet from '../pages/CreateWallet';
import SeedIntro from '../pages/SeedIntro';
import SeedPhrase from '../pages/SeedPhrase';
import RestoreSeedPhrase from '../pages/RestoreSeedPhrase';
import Congrats from '../pages/Congrats';

const AppLoader = () => {
  return (
    <Container className='App'>
      <Router>
        <Routes>
          <Route path='' element={<Navigate to='welcome' replace />} />
          <Route path='welcome' element={<Welcome />} />
          <Route path='intro' element={<Intro />} />
          <Route path='our-goal' element={<OurGoal />} />
          <Route path='select-action' element={<SelectAction />} />
          <Route path='import-wallet' element={<ImportWallet />} />
          <Route path='create-wallet' element={<CreateWallet />} />
          <Route path='seed-phrase-intro' element={<SeedIntro />} />
          <Route path='seed-phrase' element={<SeedPhrase />} />
          <Route path='seed-phrase-restore' element={<RestoreSeedPhrase />} />
          <Route path='congrats' element={<Congrats />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default AppLoader;