import React from 'react';
import { Provider } from 'react-redux';
import Routes from './src/config/routes';
import { store } from './src/config/store';

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
