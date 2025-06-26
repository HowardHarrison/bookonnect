// src/state/themeSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light',
};

const modeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { toggleMode, setMode } = modeSlice.actions;
export default modeSlice.reducer;
