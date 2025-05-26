import { getRegistration, postLogin, postRecovery, postRegistration, postReset, postSetup } from './auth';
import {
  deleteCartItem,
  deletePromo,
  getCart,
  getCheckout,
  postCartConfirm,
  postCartItem,
  postCheckout,
  postPromo,
} from './cart';
import client from './client';
import { getFabric, getFabrics } from './getFabrics';
import getMailing from './getMailing';
import getMailings from './getMailings';
import postSupport from './support';
import {
  getUser,
  getUserInvoice,
  getUserInvoices,
  getUserOrder,
  getUserOrders,
  getUserProfile,
  postUserProfile,
} from './user';
import { deleteWishlistItem, getWishlist, postWishlistItem } from './wishlist';

export {
  client,
  getMailing,
  getMailings,
  getFabrics,
  getFabric,
  getWishlist,
  postWishlistItem,
  deleteWishlistItem,
  getUser,
  getUserProfile,
  postUserProfile,
  getUserOrders,
  getUserOrder,
  getUserInvoices,
  getUserInvoice,
  getCart,
  getCheckout,
  postCartItem,
  deleteCartItem,
  postCartConfirm,
  postCheckout,
  postPromo,
  deletePromo,
  postSupport,
  postLogin,
  postRecovery,
  postReset,
  getRegistration,
  postRegistration,
  postSetup,
};
