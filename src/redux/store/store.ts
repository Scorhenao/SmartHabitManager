import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import themeReducer from '../slice/themeSlice';
import authSlice from '../slice/authSlice';

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['token', 'isAuthenticated'],
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: persistedAuthReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
