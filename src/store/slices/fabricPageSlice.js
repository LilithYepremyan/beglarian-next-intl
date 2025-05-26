import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { decrementWishlist, incrementWishlist, updateCart } from "./userSlice";
import {
  getFabric,
  postWishlistItem,
  deleteWishlistItem,
  postCartItem,
} from "@/api";

export const fetchFabric = createAsyncThunk(
  "fabricPage/fetchFabric",
  async (id) => {
    const response = await getFabric(id);

    return response;
  }
);

export const addFabricToWishlist = createAsyncThunk(
  "fabricPage/addFabricToWishlist",
  async ({ id }, thunkAPI) => {
    const response = await postWishlistItem(id);

    thunkAPI.dispatch(incrementWishlist());

    return response;
  }
);

export const removeFabricFromWishlist = createAsyncThunk(
  "fabricPage/removeFabricFromWishlist",
  async ({ id }, thunkAPI) => {
    const response = await deleteWishlistItem(id);

    thunkAPI.dispatch(decrementWishlist());

    return response;
  }
);

export const addFabricToCart = createAsyncThunk(
  "fabricPage/addFabricToCart",
  async ({ id, length }, thunkAPI) => {
    try {
      const response = await postCartItem(id, length);

      const { count, sum } = response.total || {};

      thunkAPI.dispatch(updateCart({ count, sum }));

      return response;
    } catch (error) {
      thunkAPI.dispatch(fetchFabric({ id }));

      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  data: {
    fabric: null,
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
  error: null,
};

export const fabricPageSlice = createSlice({
  name: "fabricPage",
  initialState,
  reducers: {
    resetState: () => initialState,

    setIsAddToCartModalOpen: (state, action) => {
      state.isAddToCartModalOpen = !!action?.payload?.isOpen;
    },

    setIsFabricChangedModalOpen: (state, action) => {
      state.isFabricChangedModalOpen = !!action?.payload?.isOpen;

      if (action?.payload?.isOpen) {
        state.fabricChangedInfo = initialState.fabricChangedInfo;
      }
    },
  },
  extraReducers: (builder) => {
    // fetchFabric

    builder.addCase(fetchFabric.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFabric.fulfilled, (state, action) => {
      state.isLoading = false;

      state.data.fabric = action.payload;
    });
    builder.addCase(fetchFabric.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.error.message;
    });

    // addFabricToWishlist

    builder.addCase(addFabricToWishlist.fulfilled, (state) => {
      state.data.fabric.isLiked = true;
    });
    builder.addCase(addFabricToWishlist.rejected, (state, action) => {
      state.error = action.error.message;
    });

    // removeFabricFromWishlist

    builder.addCase(removeFabricFromWishlist.fulfilled, (state) => {
      state.data.fabric.isLiked = false;
    });
    builder.addCase(removeFabricFromWishlist.rejected, (state, action) => {
      state.error = action.error.message;
    });

    // addFabricToCart

    builder.addCase(addFabricToCart.pending, (state, action) => {
      state.isAddToCartLoading = !!action?.meta?.arg?.id;
    });
    builder.addCase(addFabricToCart.fulfilled, (state, action) => {
      const fabricId = action?.meta?.arg?.id;

      state.isAddToCartLoading = false;
      state.isFabricChangedModalOpen = false;
      state.fabricChangedInfo = initialState.fabricChangedInfo;

      const { price, length } =
        action?.payload?.fabrics?.find((x) => x.id === fabricId) || {};

      if (price && length) {
        state.data.fabric.lengthInCart = length;
        state.data.fabric.priceInCart = price;
        state.isAddToCartModalOpen = true;
      }

      const isSampleInCart = !!action?.payload?.fabricsSamples?.find(
        (x) => x.id === fabricId
      );

      if (isSampleInCart) {
        state.data.fabric.isSampleInCart = true;
      }
    });
    builder.addCase(addFabricToCart.rejected, (state, action) => {
      state.isFabricChangedModalOpen = true;

      const data = state.data.fabric || {};
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
  setIsFabricChangedModalOpen,
  resetState,
} = fabricPageSlice.actions;

export default fabricPageSlice.reducer;
