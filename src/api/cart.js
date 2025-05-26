import client from './client';
import cartFormatter from './formatters/cartFormatter';

async function getCart() {
  return client.get(`/cart/`).then(response => cartFormatter(response?.data));
}

async function getCheckout(orderId) {
  return client.get(`/checkout/simple/data/`, { params: { orderId } }).then(response => response?.data);
}

async function postCheckout(orderId, checkoutInfo) {
  return client
    .post(`/checkout/simple`, {
      orderId,
      ...checkoutInfo,
    })
    .then(response => response?.data);
}

async function postCartItem(id, length) {
  return client
    .post(`/cart/`, {
      fabricId: id,
      length,
    })
    .then(response => cartFormatter(response?.data));
}

async function postPromo(promoCode) {
  return client.post(`/cart/promo/${promoCode || ''}`).then(response => cartFormatter(response?.data));
}

async function deletePromo() {
  return client.delete(`/cart/promo/`).then(response => cartFormatter(response?.data));
}

async function postCartConfirm(cart) {
  return client
    .post(`/cart/confirm`, cart)
    .then(response => {
      const { status } = response;

      const summary = response?.data;

      const total = {
        count: summary.count,
        cutsCount: summary.cutsCount,
        length: summary.length,
        weight: summary.weight,
        price: summary?.sum,
        sale: {},
      };

      if (summary?.sumWithoutDiscount && summary?.discount) {
        total.sale.oldPrice = summary?.sumWithoutDiscount;
        total.sale.percent = summary?.discount;
      }

      return { total, orderId: summary.orderId, status };
    })
    .catch(({ response }) => {
      const errorObj = { status: response?.status, data: cartFormatter(response?.data) };

      throw errorObj;
    });
}

async function postCheckoutDeliveryData(request) {
  return client
    .post(`/checkout/delivery/data`, request)
    .then(response => response?.data)
    .catch(({ response }) => {
      const errorObj = { status: response?.status, data: cartFormatter(response?.data) };

      throw errorObj;
    });
}

async function postCheckoutDeliveryConfirm(request) {
  return client
    .post(`/checkout/delivery/confirm`, request)
    .then(response => response?.data)
    .catch(({ response }) => {
      const errorObj = { status: response?.status, data: cartFormatter(response?.data) };

      throw errorObj;
    });
}

async function postCheckoutConfirm(request) {
  return client
    .post(`/checkout/confirm`, request)
    .then(response => response?.data)
    .catch(({ response }) => {
      const errorObj = { status: response?.status, data: cartFormatter(response?.data) };

      throw errorObj;
    });
}

async function deleteCartItem(id) {
  return client.delete(`/cart/${id || ''}`).then(response => cartFormatter(response?.data));
}

async function deleteCart() {
  return client.delete(`/cart/`).then(response => cartFormatter(response?.data));
}

export {
  getCart,
  postCartItem,
  deleteCartItem,
  deleteCart,
  postCartConfirm,
  getCheckout,
  postCheckout,
  postPromo,
  deletePromo,
  postCheckoutDeliveryData,
  postCheckoutDeliveryConfirm,
  postCheckoutConfirm,
};
