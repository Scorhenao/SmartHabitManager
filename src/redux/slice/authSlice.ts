import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthState} from '../interfaces/authState';

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    logout: state => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
