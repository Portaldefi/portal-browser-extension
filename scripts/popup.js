import React from 'react';
import ReactDOM from 'react-dom';

import FabricIdentityManager from '@fabric/http/components/FabricIdentityManager';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <FabricIdentityManager />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);