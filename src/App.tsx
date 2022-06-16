import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store';
import AppLoader from './layouts/AppLoader';

// import 'semantic-ui-css/semantic.min.css';
import './styles/global.scss';
import './styles/main.scss';

const App = () => {
  return (
    <Provider store={store}>
      <AppLoader />
    </Provider>
  );
};

export default App;
