// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// import { updateCart } from './userSlice';
// import {
//   deleteCartItem,
//   deletePromo,
//   getCart,
//   getCheckout,
//   postCartConfirm,
//   postCartItem,
//   postCheckout,
//   postPromo,
// } from '../../api';
// import { postCheckoutConfirm, postCheckoutDeliveryConfirm, postCheckoutDeliveryData } from '../../api/cart';
// import { marketingEvents, trackMarketingEvent } from '../../marketing';
// import { events, track } from '../../metrics';
// import generateId from '../../utils/generateId';

// export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
//   const response = await getCart();

//   return response;
// });

// export const applyPromo = createAsyncThunk('cart/applyPromo', async ({ promoCode }, thunkAPI) => {
//   try {
//     const response = await postPromo(promoCode);

//     const { count, sum } = response.total || {};

//     thunkAPI.dispatch(updateCart({ count, sum }));

//     return response;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error?.response?.data);
//   }
// });

// export const removePromo = createAsyncThunk('cart/removePromo', async (_arg, thunkAPI) => {
//   const response = await deletePromo();

//   const { count, sum } = response.total || {};

//   thunkAPI.dispatch(updateCart({ count, sum }));

//   track(events.cartPage.сartItem.delete);

//   return response;
// });

// export const removeFabricFromCart = createAsyncThunk('cart/removeFabricFromCart', async ({ id }, thunkAPI) => {
//   const response = await deleteCartItem(id);

//   const { count, sum } = response.total || {};

//   thunkAPI.dispatch(updateCart({ count, sum }));

//   track(events.cartPage.сartItem.delete);

//   return response;
// });

// export const removeAllFromCart = createAsyncThunk('cart/removeAllFromCart', async (_arg, thunkAPI) => {
//   const response = await deleteCartItem();

//   const {
//     cart: {
//       data: { fabricsChanged, fabricsSold, total },
//     },
//   } = thunkAPI.getState();

//   const { count, sum } = response.total || {};

//   thunkAPI.dispatch(updateCart({ count, sum }));

//   track(events.cartPage.clear, {
//     changedCount: fabricsChanged.length,
//     soldCount: fabricsSold.length,
//     price: total.price,
//     length: total.length,
//     count: total.count,
//   });

//   return response;
// });

// export const editCartItem = createAsyncThunk('cart/editCartItem', async ({ id, length }, thunkAPI) => {
//   try {
//     const response = await postCartItem(id, length);

//     const { count, sum } = response.total || {};

//     thunkAPI.dispatch(updateCart({ count, sum }));

//     track(events.cartPage.сartItem.edit);

//     return response;
//   } catch (error) {
//     thunkAPI.dispatch(fetchCart());

//     track(events.cartPage.сartItem.editError, { error });

//     return thunkAPI.rejectWithValue(error);
//   }
// });

// export const confirmCart = createAsyncThunk('cart/confirmCart', async ({ promoCode }, thunkAPI) => {
//   try {
//     const {
//       cart: {
//         data: { cartToConfirm, fabricsChanged, fabricsSold, fabricsSamples, total },
//       },
//     } = thunkAPI.getState();

//     const response = await postCartConfirm({ ...cartToConfirm, promoCode });

//     thunkAPI.dispatch(updateCart({ count: 0, sum: 0 }));

//     track(events.cartPage.confirm, {
//       changedCount: fabricsChanged.length,
//       soldCount: fabricsSold.length,
//       samplesCount: fabricsSamples.length,
//       price: total.price,
//       length: total.length,
//       count: total.count,
//     });

//     trackMarketingEvent(marketingEvents.cart.confirm);

//     return response;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error);
//   }
// });

// // CHECKOUT

// export const fetchCheckout = createAsyncThunk('cart/fetchCheckout', async ({ orderId }) => {
//   const response = await getCheckout(orderId);

//   return response;
// });

// export const saveCheckoutInfo = createAsyncThunk('cart/saveCheckoutInfo', async ({ orderId, checkoutInfo }) => {
//   const response = await postCheckout(orderId, checkoutInfo);

//   return response;
// });

// // CHECKOUT 2.0

// export const fetchCheckoutDeliveryData = createAsyncThunk('cart/checkoutDeliveryData', async (_arg, thunkAPI) => {
//   try {
//     const {
//       cart: {
//         data: { cartToConfirm },
//       },
//     } = thunkAPI.getState();

//     const response = await postCheckoutDeliveryData({ ...cartToConfirm });

//     return response;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error);
//   }
// });

// export const confirmDeliveryData = createAsyncThunk('cart/confirmDeliveryData', async ({ checkoutInfo }, thunkAPI) => {
//   try {
//     const {
//       cart: {
//         data: { cartToConfirm },
//       },
//     } = thunkAPI.getState();

//     const response = await postCheckoutDeliveryConfirm({ ...cartToConfirm, ...checkoutInfo });

//     return response;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error);
//   }
// });

// export const checkoutConfirm = createAsyncThunk('cart/checkoutConfirm', async ({ checkoutInfo }, thunkAPI) => {
//   try {
//     const {
//       cart: {
//         data: { cartToConfirm },
//       },
//     } = thunkAPI.getState();

//     const response = await postCheckoutConfirm({ ...cartToConfirm, ...checkoutInfo });

//     return response;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error);
//   }
// });

// const initialState = {
//   data: {
//     minimalOrder: 75,
//     fabrics: [null, null, null, null],
//     fabricsChanged: [],
//     fabricsSold: [],
//     fabricsSamples: [],
//     total: {},
//     cartToConfirm: {},
//     checkoutInfo: {},
//     promoCode: null,
//     deliveryData: {},
//     checkoutData: {},
//     confirmed: {},
//   },
//   isCartChangedModalOpen: false,
//   isEditCartItemModalOpen: false,
//   isLoading: true,
//   isConfirmLoading: false,
//   isConfirmed: false,
//   error: null,
//   promoCodeError: null,

//   isCheckoutLoading: true,
//   isCheckoutSaving: false,
//   isCheckoutSaved: false,

//   isDeliveryDataStep: false,
//   isDeliveryDataLoading: false,
//   isDeliveryOffersLoading: false,

//   isCheckoutStep: false,
//   isDeliveryDataConfirming: false,

//   isCheckoutConfirmStep: false,
//   isCheckoutConfirming: false,

//   isCheckoutPaymentStep: false,
//   isCheckoutSuccessStep: false,
// };

// export const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     setIsLoading: (state, action) => {
//       state.isLoading = action.payload;
//     },

//     cartChangedModalClosed: (state, action) => {
//       state.isCartChangedModalOpen = action.payload;
//     },

//     setIsEditCartItemModalOpen: (state, action) => {
//       state.isEditCartItemModalOpen = action.payload;
//     },

//     setIsDeliveryDataStep: (state, action) => {
//       state.isDeliveryDataStep = action.payload;
//     },

//     setIsCheckoutConfirmStep: (state, action) => {
//       state.isCheckoutConfirmStep = action.payload;
//     },

//     setIsCheckoutPaymentStep: (state, action) => {
//       state.isCheckoutPaymentStep = action.payload;
//     },

//     setIsCheckoutSuccessStep: (state, action) => {
//       state.isCheckoutSuccessStep = action.payload;
//     },

//     resetState: () => initialState,
//   },
//   extraReducers: builder => {
//     // fetchCart

//     builder.addCase(fetchCart.pending, state => {
//       state.isLoading = true;
//     });
//     builder.addCase(fetchCart.fulfilled, (state, action) => {
//       state.isLoading = false;

//       state.promoCodeError = null;
//       state.data = { ...state.data, ...action.payload };
//     });
//     builder.addCase(fetchCart.rejected, (state, action) => {
//       state.isLoading = false;

//       state.error = action.error.message;
//     });

//     // applyPromo
//     builder.addCase(applyPromo.pending, state => {
//       state.isLoading = true;
//       state.promoCodeError = null;
//     });
//     builder.addCase(applyPromo.fulfilled, (state, action) => {
//       state.isLoading = false;

//       state.data = { ...state.data, ...action.payload };
//       state.promoCodeError = null;
//     });
//     builder.addCase(applyPromo.rejected, (state, action) => {
//       state.isLoading = false;

//       state.promoCodeError = action.payload.msg;
//     });

//     // c
//     builder.addCase(removePromo.pending, state => {
//       state.isLoading = true;
//     });
//     builder.addCase(removePromo.fulfilled, (state, action) => {
//       state.isLoading = false;

//       state.data = { ...state.data, ...action.payload };
//     });
//     builder.addCase(removePromo.rejected, (state, action) => {
//       state.isLoading = false;

//       state.error = action.error.message;
//     });

//     // removeFabricFromCart

//     builder.addCase(removeFabricFromCart.pending, state => {
//       state.isLoading = true;
//     });
//     builder.addCase(removeFabricFromCart.fulfilled, (state, action) => {
//       state.isLoading = false;

//       state.data = { ...state.data, ...action.payload };
//     });
//     builder.addCase(removeFabricFromCart.rejected, (state, action) => {
//       state.isLoading = false;

//       state.error = action.error.message;
//     });

//     // removeAllFromCart

//     builder.addCase(removeAllFromCart.pending, state => {
//       state.isLoading = true;

//       state.data = initialState.data;
//     });
//     builder.addCase(removeAllFromCart.fulfilled, state => {
//       state.isLoading = false;

//       state.data = { ...initialState.data, fabrics: [] };
//     });
//     builder.addCase(removeAllFromCart.rejected, (state, action) => {
//       state.isLoading = false;

//       state.error = action.error.message;
//     });

//     // editCartItem

//     builder.addCase(editCartItem.pending, state => {
//       state.isLoading = true;
//     });
//     builder.addCase(editCartItem.fulfilled, (state, action) => {
//       state.isLoading = false;

//       state.data = { ...state.data, ...action.payload };
//       state.isEditCartItemModalOpen = false;
//     });
//     builder.addCase(editCartItem.rejected, (state, action) => {
//       const { code, msg: message } = action.payload || {};

//       state.isLoading = false;
//       state.isCartChangedModalOpen = true;
//       state.isEditCartItemModalOpen = false;

//       state.error = { code, message, id: generateId() };
//     });

//     // confirmCart

//     builder.addCase(confirmCart.pending, state => {
//       state.isConfirmLoading = true;
//     });
//     builder.addCase(confirmCart.fulfilled, (state, action) => {
//       state.isConfirmLoading = false;

//       state.data.total = action.payload.total;
//       state.data.checkoutInfo.orderId = action.payload.orderId;
//       state.isConfirmed = true;
//     });
//     builder.addCase(confirmCart.rejected, (state, action) => {
//       state.isConfirmLoading = false;

//       if (action.payload.status === 409) {
//         state.isCartChangedModalOpen = true;
//       }

//       state.data = action.payload.data;
//     });

//     // fetchCheckout

//     builder.addCase(fetchCheckout.pending, state => {
//       state.isCheckoutLoading = true;
//     });
//     builder.addCase(fetchCheckout.fulfilled, (state, action) => {
//       state.isCheckoutLoading = false;

//       const summary = action?.payload?.summary || {};

//       const total = {
//         ...summary,
//         price: summary?.sum,
//         sale: {},
//       };

//       if (summary?.sumWithoutDiscount && summary?.discount) {
//         total.sale.oldPrice = summary?.sumWithoutDiscount;
//         total.sale.percent = summary?.discount;
//       }

//       state.data.total = total;
//       state.data.checkoutInfo = { ...state.data.checkoutInfo, ...action.payload };
//     });
//     builder.addCase(fetchCheckout.rejected, (state, action) => {
//       state.isCheckoutLoading = false;

//       state.error = action.error.message;
//     });

//     // saveCheckoutInfo

//     builder.addCase(saveCheckoutInfo.pending, state => {
//       state.isCheckoutSaving = true;
//       state.isCheckoutSaved = false;
//     });
//     builder.addCase(saveCheckoutInfo.fulfilled, (state, action) => {
//       state.data.checkoutInfo = { ...state.data.checkoutInfo, ...action?.meta?.arg?.checkoutInfo };
//       state.isCheckoutSaving = false;
//       state.isCheckoutSaved = true;
//     });
//     builder.addCase(saveCheckoutInfo.rejected, (state, action) => {
//       state.isCheckoutSaving = false;
//       state.isCheckoutSaved = false;

//       state.error = action.error.message;
//     });

//     // fetchCheckoutDeliveryData
//     builder.addCase(fetchCheckoutDeliveryData.pending, state => {
//       state.isDeliveryDataLoading = true;
//     });
//     builder.addCase(fetchCheckoutDeliveryData.fulfilled, (state, action) => {
//       state.isDeliveryDataLoading = false;

//       const summary = action?.payload?.summary || {};

//       const total = {
//         ...summary,
//         price: summary?.sum,
//         sale: {},
//       };

//       if (summary?.sumWithoutDiscount && summary?.discount) {
//         total.sale.oldPrice = summary?.sumWithoutDiscount;
//         total.sale.percent = summary?.discount;
//       }

//       state.data.total = total;
//       state.data.deliveryData = { ...action.payload };
//     });
//     builder.addCase(fetchCheckoutDeliveryData.rejected, (state, action) => {
//       state.isDeliveryDataLoading = false;

//       if (action.payload.status === 409) {
//         state.isCartChangedModalOpen = true;
//       }

//       state.data = action.payload.data;
//     });

//     // saveCheckoutDelivery
//     builder.addCase(confirmDeliveryData.pending, state => {
//       state.isDeliveryDataConfirming = true;
//     });
//     builder.addCase(confirmDeliveryData.fulfilled, (state, action) => {
//       state.isDeliveryDataConfirming = false;
//       state.deliveryData = {};

//       const summary = action?.payload?.summary || {};

//       const total = {
//         ...summary,
//         price: summary?.sum,
//         sale: {},
//       };

//       if (summary?.sumWithoutDiscount && summary?.discount) {
//         total.sale.oldPrice = summary?.sumWithoutDiscount;
//         total.sale.percent = summary?.discount;
//       }

//       state.data.total = total;
//       state.data.checkoutData = { ...action.payload };
//     });
//     builder.addCase(confirmDeliveryData.rejected, (state, action) => {
//       state.isDeliveryDataConfirming = false;

//       if (action.payload.status === 409) {
//         state.isCartChangedModalOpen = true;
//       }

//       state.data = action.payload.data;
//     });

//     // checkoutConfirm
//     builder.addCase(checkoutConfirm.pending, state => {
//       state.isCheckoutConfirming = true;
//     });
//     builder.addCase(checkoutConfirm.fulfilled, (state, action) => {
//       state.isCheckoutConfirming = false;
//       state.checkoutData = {};

//       state.data.confirmed = { ...action.payload };
//     });
//     builder.addCase(checkoutConfirm.rejected, (state, action) => {
//       state.isCheckoutConfirming = false;

//       if (action.payload.status === 409) {
//         state.isCartChangedModalOpen = true;
//       }

//       state.data = action.payload.data;
//     });
//   },
// });

// export const {
//   update,
//   cartChangedModalClosed,
//   setIsEditCartItemModalOpen,
//   resetState,
//   setIsDeliveryDataStep,
//   setIsCheckoutConfirmStep,
//   setIsCheckoutPaymentStep,
//   setIsCheckoutSuccessStep,
// } = cartSlice.actions;

// export default cartSlice.reducer;
