import {createSlice} from '@reduxjs/toolkit';
import {lightModeTheme} from '../../theme/LightModeTheme';
import {darkModeTheme} from '../../theme/DarkModeTheme';

const initialState = {
  darkMode: false,
  theme: lightModeTheme,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: state => {
      state.darkMode = !state.darkMode;
      state.theme = state.darkMode ? darkModeTheme : lightModeTheme;
    },
  },
});

export const {toggleDarkMode} = themeSlice.actions;
export default themeSlice.reducer;
