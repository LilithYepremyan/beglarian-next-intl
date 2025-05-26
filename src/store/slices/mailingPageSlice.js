import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { updateCart, decrementWishlist, incrementWishlist } from "./userSlice";
import {
  getFabrics,
  getMailing,
  postWishlistItem,
  deleteWishlistItem,
  postCartItem,
} from "@/api";

export const fetchMailing = createAsyncThunk(
  "mailingPage/fetchMailing",
  async ({ id }, thunkAPI) => {
    try {
      const response = await getMailing(id);

      return response;
    } catch (error) {
      const code = error?.response?.status;

      return thunkAPI.rejectWithValue({
        code,
      });
    }
  }
);

export const fetchFabricsOfMailing = createAsyncThunk(
  "mailingPage/fetchFabricsOfMailing",
  async ({ id, page, sort, filters, itemsPerPage }) => {
    const response = await getFabrics(id, page, sort, filters, itemsPerPage);

    return response;
  }
);

export const addFabricToWishlist = createAsyncThunk(
  "mailingPage/addFabricToWishlist",
  async ({ id }, thunkAPI) => {
    const response = await postWishlistItem(id);

    thunkAPI.dispatch(incrementWishlist());

    return response;
  }
);

export const removeFabricFromWishlist = createAsyncThunk(
  "mailingPage/removeFabricFromWishlist",
  async ({ id }, thunkAPI) => {
    const response = await deleteWishlistItem(id);

    thunkAPI.dispatch(decrementWishlist());

    return response;
  }
);

export const addFabricToCart = createAsyncThunk(
  "mailingPage/addFabricToCart",
  async ({ id, length }, thunkAPI) => {
    try {
      const response = await postCartItem(id, length);

      const { count, sum } = response.total || {};

      thunkAPI.dispatch(updateCart({ count, sum }));

      return response;
    } catch (error) {
      const {
        mailingPage: { data },
      } = thunkAPI.getState();

      thunkAPI.dispatch(
        fetchFabricsOfMailing({
          id: data.id,
          page: data.page,
          sort: data.sortId,
          filters: data.filters,
        })
      );

      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  data: {
    id: null,
    fabrics: [null, null, null, null],
    pagesTotal: 0,
    fabricOrderBy: null,
    fabricsTotal: 0,
    page: 1,
    sortId: null,
    title: null,
    description: null,
  },
  isAddToCartModalOpen: false,
  isFabricChangedModalOpen: false,
  fabricChangedInfo: {
    min: 0,
    max: 0,
    maxSamplesReached: false,
  },
  isLoading: false,
  isAddToCartLoading: false,
  addedFabricId: 0,
  error: null,
};

export const mailingPageSlice = createSlice({
  name: "mailingPage",
  initialState,
  reducers: {
    resetState: () => initialState,
    setIsAddToCartModalOpen: (state, action) => {
      state.isAddToCartModalOpen = !!action?.payload?.isOpen;
    },
    setIsFabricChangedModalOpen: (state, action) => {
      state.isFabricChangedModalOpen = !!action?.payload?.isOpen;
    },
  },
  extraReducers: (builder) => {
    // fetchMailing

    builder.addCase(fetchMailing.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMailing.fulfilled, (state, action) => {
      state.isLoading = false;

      state.data = { ...state.data, ...action.payload };
    });
    builder.addCase(fetchMailing.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.payload?.code;
    });

    // fetchFabricsOfMailing

    builder.addCase(fetchFabricsOfMailing.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFabricsOfMailing.fulfilled, (state, action) => {
      state.isLoading = false;

      const filters = action?.meta?.arg?.filters;
      const id = action?.meta?.arg?.id;

      state.data = { ...state.data, ...action.payload, filters, id };
    });
    builder.addCase(fetchFabricsOfMailing.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.error.message;
    });

    // addFabricToWishlist

    builder.addCase(addFabricToWishlist.fulfilled, (state, action) => {
      const fabricId = action?.meta?.arg?.id;

      state.data.fabrics.find((x) => x.id === fabricId).isLiked = true;
    });
    builder.addCase(addFabricToWishlist.rejected, (state, action) => {
      state.error = action.error.message;
    });

    // removeFabricFromWishlist

    builder.addCase(removeFabricFromWishlist.fulfilled, (state, action) => {
      const fabricId = action?.meta?.arg?.id;

      state.data.fabrics.find((x) => x.id === fabricId).isLiked = false;
    });
    builder.addCase(removeFabricFromWishlist.rejected, (state, action) => {
      state.error = action.error.message;
    });

    // addFabricToCart

    builder.addCase(addFabricToCart.pending, (state, action) => {
      state.addedFabricId = action?.meta?.arg?.id || 0;
      state.isAddToCartLoading = !!action?.meta?.arg?.id;
    });
    builder.addCase(addFabricToCart.fulfilled, (state, action) => {
      const fabricId = action?.meta?.arg?.id;

      state.addedFabricId = 0;
      state.isAddToCartLoading = false;
      state.isFabricChangedModalOpen = false;
      state.fabricChangedInfo = initialState.fabricChangedInfo;

      const { price, length } =
        action?.payload?.fabrics?.find((x) => x.id === fabricId) || {};

      if (price && length) {
        state.data.fabrics.find((x) => x.id === fabricId).lengthInCart = length;
        state.data.fabrics.find((x) => x.id === fabricId).priceInCart = price;
        state.isAddToCartModalOpen = true;
      }

      const isSampleInCart = !!action?.payload?.fabricsSamples?.find(
        (x) => x.id === fabricId
      );

      if (isSampleInCart) {
        state.data.fabrics.find((x) => x.id === fabricId).isSampleInCart = true;
      }
    });
    builder.addCase(addFabricToCart.rejected, (state, action) => {
      state.isFabricChangedModalOpen = true;

      const data = action?.payload?.data || {};
      const msg = action?.payload?.msg || "";

      state.isAddToCartLoading = false;

      state.fabricChangedInfo = {
        min: Number.parseFloat(data.min, 10) || 0,
        max: Number.parseFloat(data.max, 10) || 0,
        maxSamplesReached: msg === "common.TooManySamples",
      };

      state.error = action.error.message;
    });
  },
});

export const {
  resetState,
  setIsAddToCartModalOpen,
  setIsFabricChangedModalOpen,
} = mailingPageSlice.actions;

export default mailingPageSlice.reducer;
