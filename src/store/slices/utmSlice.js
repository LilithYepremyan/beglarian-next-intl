import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {
    utm: {},
  },
};

export const authSlice = createSlice({
  name: 'utmSlice',
  initialState,
  reducers: {
    setUtmParams: (state, action) => {
      state.data.utm = { ...state.data.utm, ...action.payload };
    },
  },
});

export const { setUtmParams } = authSlice.actions;

export default authSlice.reducer;
