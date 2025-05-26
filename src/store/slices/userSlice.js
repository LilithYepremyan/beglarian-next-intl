import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { setIsLoggedIn } from './authSlice';
import {
  getUser,
  getUserProfile,
  postUserProfile,
  getUserOrders,
  getUserOrder,
  getUserInvoices,
  getUserInvoice,
} from '@/api';
import { setUserInfo } from '@/metrics/amplitude';
import generateId from '@/utils/generateId';

export const fetchUser = createAsyncThunk('user/fetchUser', async (_arg, thunkAPI) => {
  const response = await getUser();

  if (response?.isLoggedIn) {
    thunkAPI.dispatch(setIsLoggedIn(true));
  } else {
    thunkAPI.dispatch(setIsLoggedIn(false));
  }

  return response;
});

// profile

export const fetchUserProfile = createAsyncThunk('user/fetchUserProfile', async () => {
  const response = await getUserProfile();

  return response;
});

export const updateUserProfile = createAsyncThunk('user/updateUserProfile', async data => {
  const response = await postUserProfile(data);

  return response;
});

// orders

export const fetchUserOrders = createAsyncThunk('user/fetchUserOrders', async ({ page, dateFrom, dateTo }) => {
  const response = await getUserOrders(page, dateFrom, dateTo);

  return response;
});

export const fetchUserOrder = createAsyncThunk('user/fetchUserOrder', async id => {
  const response = await getUserOrder(id);

  return response;
});

// invoices

export const fetchUserInvoices = createAsyncThunk('user/fetchUserInvoices', async ({ page, dateFrom, dateTo }) => {
  const response = await getUserInvoices(page, dateFrom, dateTo);

  return response;
});

export const fetchUserInvoice = createAsyncThunk('user/fetchUserInvoice', async id => {
  const response = await getUserInvoice(id);

  return response;
});

const initialState = {
  data: {
    stats: {
      invoices: {
        hasUnpayed: false,
      },
      cart: {
        count: 0,
        sum: 0,
      },
      wishlist: {
        count: 0,
      },
    },
    invoices: {
      page: 1,
      totalPages: null,
      data: [null, null, null, null],
    },
    invoice: {
      fabrics: [null, null, null, null],
    },
    orders: {
      page: 1,
      totalPages: null,
      data: [null, null, null, null],
    },
    order: {
      fabrics: [null, null, null, null],
    },
    userGroup: null,
    originalUtm: null,
    email: null,
    profile: null,
    firstOrder: 75,
    isLoggedIn: false,
    otherOrder: 75,
    reservationTimeoutInMinutes: 120,
    userMinimalOrder: 75,
  },
  isLoading: false,
  isPending: false,
  isProfileUpdatedToken: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateCart: (state, action) => {
      state.data.stats.cart = action.payload;
    },

    decrementWishlist: state => {
      const { count } = state.data.stats.wishlist;

      state.data.stats.wishlist.count = count === 0 ? 0 : count - 1;
    },

    incrementWishlist: state => {
      const { count } = state.data.stats.wishlist;

      state.data.stats.wishlist.count = count + 1;
    },

    resetOrders: state => {
      state.data.orders = initialState.data.orders;
    },

    resetOrder: state => {
      state.data.order = initialState.data.order;
    },

    resetInvoices: state => {
      state.data.invoices = initialState.data.invoices;
    },

    resetInvoice: state => {
      state.data.invoice = initialState.data.invoice;
    },

    setIsProfileUpdatedToken: (state, action) => {
      state.data.isProfileUpdatedToken = action.payload;
    },
  },
  extraReducers: builder => {
    // fetchUser

    builder.addCase(fetchUser.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;

      setUserInfo(action.payload);

      state.data = { ...state.data, ...action.payload };
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.error.message;
    });

    // fetchUserProfile

    builder.addCase(fetchUserProfile.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.isLoading = false;

      state.data.profile = action.payload || null;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.error.message;
    });

    // updateUserProfile

    builder.addCase(updateUserProfile.pending, state => {
      state.isPending = true;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.isPending = false;
      state.isProfileUpdatedToken = generateId();

      state.data.profile = action.payload || null;
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.isPending = false;

      state.error = action.error.message;
    });

    // fetchUserOrders

    builder.addCase(fetchUserOrders.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
      state.isLoading = false;

      state.data.orders = action.payload || initialState.data.orders;
    });
    builder.addCase(fetchUserOrders.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.error.message;
    });

    // fetchUserOrder

    builder.addCase(fetchUserOrder.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserOrder.fulfilled, (state, action) => {
      state.isLoading = false;

      state.data.order = action.payload || initialState.data.order;
    });
    builder.addCase(fetchUserOrder.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.error.message;
    });

    // fetchUserInvoices

    builder.addCase(fetchUserInvoices.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserInvoices.fulfilled, (state, action) => {
      state.isLoading = false;

      state.data.invoices = action.payload || initialState.data.invoices;
    });
    builder.addCase(fetchUserInvoices.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.error.message;
    });

    // fetchUserInvoice

    builder.addCase(fetchUserInvoice.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserInvoice.fulfilled, (state, action) => {
      state.isLoading = false;

      state.data.invoice = action.payload || initialState.data.invoice;
    });
    builder.addCase(fetchUserInvoice.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.error.message;
    });
  },
});

export const {
  updateCart,
  decrementWishlist,
  incrementWishlist,
  resetOrders,
  resetOrder,
  resetInvoices,
  resetInvoice,
  setIsProfileUpdatedToken,
} = userSlice.actions;

export default userSlice.reducer;
