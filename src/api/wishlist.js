import client from './client';
import fabricsFormatter from './formatters/fabricsFormatter';
import { filtersDictionary } from './getFabrics';

async function getWishlist(page, sort, filters, ps = 12) {
  const filtersToRequest = Object.entries(filters).reduce((prev, curr) => {
    const filterName = curr[0];
    const filterValue = curr[1];

    if (!filterValue) {
      return {
        ...prev,
      };
    }

    return {
      ...prev,
      [filtersDictionary[filterName] || filterName]: filterValue.toString(),
    };
  }, {});

  return client
    .get(`/fabrics/`, {
      params: { ps, cp: page, wishlist: true, order_by: sort, ...filtersToRequest },
    })
    .then(response => fabricsFormatter(response?.data));
}

async function postWishlistItem(id) {
  return client.post(`/wishlist/${id}`).then(response => response?.data);
}

async function deleteWishlistItem(id) {
  return client.delete(`/wishlist/${id}`).then(response => response?.data);
}

export { getWishlist, postWishlistItem, deleteWishlistItem };
