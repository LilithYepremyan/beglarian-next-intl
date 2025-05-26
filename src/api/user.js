import client from './client';
import orderItemFormatter from './formatters/orderItemFormatter';

async function getUser() {
  return client.get(`/user`).then(response => {
    const {
      invoices,
      userId,
      shoppingCart: cart,
      wishlist,
      firstOrder,
      isLoggedIn,
      otherOrder,
      reservationTimeoutInMinutes,
      userMinimalOrder,
      userGroup,
      originalUtm,
      email,
    } = response?.data || {};
    return {
      stats: {
        invoices,
        cart,
        wishlist,
      },
      userId,
      userGroup,
      originalUtm,
      email,
      firstOrder,
      isLoggedIn,
      otherOrder,
      reservationTimeoutInMinutes,
      userMinimalOrder,
    };
  });
}

async function getUserProfile() {
  return client.get(`/user/profile`).then(response => response?.data);
}

async function postUserProfile(data) {
  return client.post(`/user/profile`, data).then(response => response?.data);
}

async function getUserOrders(page, dateFrom, dateTo) {
  return client
    .get(`/orders`, {
      params: {
        ps: 12,
        cp: page,
        from: dateFrom?.valueOf(),
        to: dateTo?.valueOf(),
      },
    })
    .then(response => response?.data);
}

async function getUserOrder(id) {
  return client.get(`/orders/${id}`).then(response => {
    const { data } = response || {};
    const { fabrics: fabricsUnformatted } = data;

    return { ...data, fabrics: fabricsUnformatted.map(x => orderItemFormatter(x)) };
  });
}

async function getUserInvoices(page, dateFrom, dateTo) {
  return client
    .get(`/invoices`, {
      params: {
        ps: 12,
        cp: page,
        from: dateFrom?.valueOf(),
        to: dateTo?.valueOf(),
      },
    })
    .then(response => response?.data);
}

async function getUserInvoice(id) {
  return client.get(`/invoices/${id}`).then(response => {
    const { data } = response || {};
    const { fabrics: fabricsUnformatted } = data;

    return { ...data, fabrics: fabricsUnformatted.map(x => orderItemFormatter(x)) };
  });
}

export { getUser, getUserProfile, postUserProfile, getUserOrders, getUserOrder, getUserInvoices, getUserInvoice };
