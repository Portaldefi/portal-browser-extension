import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store';
import AppLoader from './layouts/AppLoader';

// import 'semantic-ui-css/semantic.min.css';
// import './App.scss';
import '../../styles/global.scss';
import '../../styles/onboarding.scss';

const App = () => {
  return (
    <Provider store={store}>
      <AppLoader />
    </Provider>
  );
};

export default App;
