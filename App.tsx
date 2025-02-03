import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import store, {persistor} from './src/redux/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import LoadingScreen from './src/screens/LoadingScreen';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
