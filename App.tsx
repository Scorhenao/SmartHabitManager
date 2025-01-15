import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import ThemeToggle from './src/components/ThemeToggle';
import store from './src/redux/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
      <ThemeToggle />
    </Provider>
  );
};

export default App;
