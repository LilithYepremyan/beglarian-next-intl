import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { decrementWishlist, incrementWishlist, updateCart } from "./userSlice";
import {
  getFabrics,
  postWishlistItem,
  deleteWishlistItem,
  postCartItem,
} from "@/api";

export const fetchFabrics = createAsyncThunk(
  "fabricsPage/fetchFabrics",
  async ({ page, sort, filters, itemsPerPage, searchString }) => {
    const response = await getFabrics(
      null,
      page,
      sort,
      filters,
      itemsPerPage,
      searchString
    );

    return response;
  }
);

export const addFabricToWishlist = createAsyncThunk(
  "fabricsPage/addFabricToWishlist",
  async ({ id }, thunkAPI) => {
    const response = await postWishlistItem(id);

    thunkAPI.dispatch(incrementWishlist());

    return response;
  }
);

export const removeFabricFromWishlist = createAsyncThunk(
  "fabricsPage/removeFabricFromWishlist",
  async ({ id }, thunkAPI) => {
    const response = await deleteWishlistItem(id);

    thunkAPI.dispatch(decrementWishlist());

    return response;
  }
);

export const addFabricToCart = createAsyncThunk(
  "fabricsPage/addFabricToCart",
  async ({ id, length }, thunkAPI) => {
    try {
      const response = await postCartItem(id, length);

      const { count, sum } = response.total || {};

      thunkAPI.dispatch(updateCart({ count, sum }));

      return response;
    } catch (error) {
      const {
        fabricsPage: { data },
      } = thunkAPI.getState();

      thunkAPI.dispatch(
        fetchFabrics({
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
    fabrics: [null, null, null, null],
    pagesTotal: 0,
    fabricsTotal: 0,
    page: 1,
    sortId: null,
  },
  isAddToCartModalOpen: false,
  isFilterOpen: false,
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

export const fabricsPageSlice = createSlice({
  name: "fabricsPage",
  initialState,
  reducers: {
    resetState: () => initialState,

    setIsAddToCartModalOpen: (state, action) => {
      state.isAddToCartModalOpen = !!action?.payload?.isOpen;
    },

    setIsFilterOpen: (state, action) => {
      state.isFilterOpen = !!action?.payload;
    },

    setIsFabricChangedModalOpen: (state, action) => {
      state.isFabricChangedModalOpen = !!action?.payload?.isOpen;

      if (action?.payload?.isOpen) {
        state.fabricChangedInfo = initialState.fabricChangedInfo;
      }
    },
  },
  extraReducers: (builder) => {
    // fetchFabrics

    builder.addCase(fetchFabrics.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFabrics.fulfilled, (state, action) => {
      state.isLoading = false;

      const filters = action?.meta?.arg?.filters;

      state.data = { ...action.payload, filters };
    });
    builder.addCase(fetchFabrics.rejected, (state, action) => {
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
  setIsAddToCartModalOpen,
  setIsFilterOpen,
  setIsFabricChangedModalOpen,
  resetState,
} = fabricsPageSlice.actions;

export default fabricsPageSlice.reducer;
