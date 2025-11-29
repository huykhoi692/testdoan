import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface ProfileInfo {
  activeProfiles?: string[];
  ribbonEnv?: string;
  inProduction?: boolean;
  isOpenAPIEnabled?: boolean;
  'display-ribbon-on-profiles'?: string;
}

export interface ApplicationProfileState {
  ribbonEnv: string;
  inProduction: boolean;
  isOpenAPIEnabled: boolean;
}

const initialState: ApplicationProfileState = {
  ribbonEnv: '',
  inProduction: true,
  isOpenAPIEnabled: false,
};

export const getProfile = createAsyncThunk('applicationProfile/get_profile', async () => {
  const response = await axios.get<ProfileInfo>('/management/info');
  return response.data;
});

const applicationProfileSlice = createSlice({
  name: 'applicationProfile',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      const { data } = action.payload as any;
      state.ribbonEnv = data?.activeProfiles?.[1] || '';
      state.inProduction = data?.activeProfiles?.includes('prod') || false;
      state.isOpenAPIEnabled = data?.activeProfiles?.includes('api-docs') || false;
    });
  },
});

export default applicationProfileSlice.reducer;
