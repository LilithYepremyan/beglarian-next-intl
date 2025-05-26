// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// import { updateCart, decrementWishlist } from './userSlice';
// import { getWishlist, deleteWishlistItem, postCartItem } from '../../api';

// export const fetchWishlist = createAsyncThunk(
//   'wishlistPage/fetchWishlist',
//   async ({ page, sort, filters, itemsPerPage }) => {
//     const response = await getWishlist(page, sort, filters, itemsPerPage);

//     return response;
//   },
// );

// export const removeFabricFromWishlist = createAsyncThunk(
//   'wishlistPage/removeFabricFromWishlist',
//   async ({ id }, thunkAPI) => {
//     const response = await deleteWishlistItem(id);

//     const {
//       wishlistPage: {
//         data: { page, fabrics, sortId, currentFilters },
//       },
//     } = thunkAPI.getState();

//     thunkAPI.dispatch(decrementWishlist());

//     if (page > 1 && fabrics?.length === 1) {
//       thunkAPI.dispatch(fetchWishlist({ page: 1, sort: sortId, filters: currentFilters }));
//     }

//     return response;
//   },
// );

// export const addFabricToCart = createAsyncThunk('wishlistPage/addFabricToCart', async ({ id, length }, thunkAPI) => {
//   const response = await postCartItem(id, length);

//   const { count, sum } = response.total || {};

//   thunkAPI.dispatch(updateCart({ count, sum }));

//   return response;
// });

// const initialState = {
//   data: {
//     fabrics: [null, null, null, null],
//     pagesTotal: 0,
//     fabricsTotal: 0,
//     currentFilters: {},
//     page: 1,
//     sortId: 1,
//   },
//   isAddToCartModalOpen: false,
//   isLoading: false,
//   addedFabricId: 0,
//   error: null,
// };

// export const wishlistPageSlice = createSlice({
//   name: 'wishlistPage',
//   initialState,
//   reducers: {
//     resetState: () => initialState,
//     setIsAddToCartModalOpen: (state, action) => {
//       state.isAddToCartModalOpen = !!action?.payload?.isOpen;
//     },
//   },
//   extraReducers: builder => {
//     // fetchWishlist

//     builder.addCase(fetchWishlist.pending, state => {
//       state.data.fabrics = [null, null, null, null];

//       state.isLoading = true;
//     });
//     builder.addCase(fetchWishlist.fulfilled, (state, action) => {
//       state.isLoading = false;
//       const currentFilters = action?.meta?.arg?.filters;

//       state.data = { ...state.data, ...action.payload, currentFilters };
//     });
//     builder.addCase(fetchWishlist.rejected, (state, action) => {
//       state.isLoading = false;

//       state.error = action.error.message;
//     });

//     // removeFabricFromWishlist

//     builder.addCase(removeFabricFromWishlist.fulfilled, (state, action) => {
//       const fabricId = action?.meta?.arg?.id;

//       state.data.fabrics = state.data.fabrics.filter(x => x?.id !== fabricId);
//     });
//     builder.addCase(removeFabricFromWishlist.rejected, (state, action) => {
//       state.error = action.error.message;
//     });

//     // addFabricToCart

//     builder.addCase(addFabricToCart.pending, (state, action) => {
//       state.addedFabricId = action?.meta?.arg?.id || 0;
//     });
//     builder.addCase(addFabricToCart.fulfilled, (state, action) => {
//       const fabricId = action?.meta?.arg?.id;

//       state.addedFabricId = 0;

//       const { price, length } = action?.payload?.fabrics?.find(x => x.id === fabricId) || {};

//       if (price && length) {
//         state.data.fabrics.find(x => x.id === fabricId).lengthInCart = length;
//         state.data.fabrics.find(x => x.id === fabricId).priceInCart = price;
//         state.isAddToCartModalOpen = true;
//       }

//       const isSampleInCart = !!action?.payload?.fabricsSamples?.find(x => x.id === fabricId);

//       if (isSampleInCart) {
//         state.data.fabrics.find(x => x.id === fabricId).isSampleInCart = true;
//       }
//     });
//     builder.addCase(addFabricToCart.rejected, (state, action) => {
//       state.error = action.error.message;
//     });
//   },
// });

// export const { resetState, setIsAddToCartModalOpen } = wishlistPageSlice.actions;

// export default wishlistPageSlice.reducer;
