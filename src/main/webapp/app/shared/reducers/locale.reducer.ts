import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LocaleState {
  currentLocale: string;
}

const initialState: LocaleState = {
  currentLocale: localStorage.getItem('locale') || 'en',
};

const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<string>) {
      state.currentLocale = action.payload;
      localStorage.setItem('locale', action.payload);
    },
  },
});

export const { setLocale } = localeSlice.actions;
export default localeSlice.reducer;
