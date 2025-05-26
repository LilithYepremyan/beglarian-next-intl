import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { postSupport, getRegistration } from '@/api';

export const sendSupportRequest = createAsyncThunk(
  'support/sendSupportRequest',
  async ({ supportRequest, email, phone, type }) => {
    const response = await postSupport(supportRequest, email, phone, type);

    return response;
  },
);

export const fetchCountries = createAsyncThunk('support/fetchCountries', async () => {
  const response = await getRegistration();

  return response;
});

const initialState = {
  data: {
    countries: [],
    isSupportRequestSent: false,
    supportError: null,
  },
  isLoading: false,
};

export const supportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: builder => {
    // sendSupportRequest

    builder.addCase(sendSupportRequest.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(sendSupportRequest.fulfilled, state => {
      state.isLoading = false;

      state.data.isSupportRequestSent = true;
    });
    builder.addCase(sendSupportRequest.rejected, (state, action) => {
      state.isLoading = false;

      state.data.supportError = action.error.message;
    });

    // fetchCountries

    builder.addCase(fetchCountries.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.isLoading = false;

      state.data.countries = action.payload?.countries || [];
    });
    builder.addCase(fetchCountries.rejected, (state, action) => {
      state.isLoading = false;

      state.data.supportError = action.error.message;
    });
  },
});

export const { resetState } = supportSlice.actions;

export default supportSlice.reducer;
