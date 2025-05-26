import client from "./client";
import fabricFormatter from "./formatters/fabricFormatter";
import fabricsFormatter from "./formatters/fabricsFormatter";

const filtersDictionary = {
  availableFrom: "available_from",
  availableTo: "available_to",
  priceFrom: "price_from",
  priceTo: "price_to",
  densityFrom: "density_from",
  densityTo: "density_to",
  showSold: "show_sold",
  promoOnly: "show_promo",
};

async function getFabrics(
  mailingId,
  page,
  sort,
  filters = {},
  ps = 12,
  text = null
) {
  const filtersToRequest = Object.entries(filters).reduce((prev, curr) => {
    const filterName = curr[0];
    const filterValue = curr[1];

    if (Array.isArray(filterValue) && filterValue.length === 0) {
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
      params: {
        ps,
        ...(text && { text }),
        cp: page,
        mailing_id: mailingId,
        order_by: sort,
        ...filtersToRequest,
      },
    })
    .then((response) => fabricsFormatter(response?.data));
}

async function getFabric(id) {
  return client
    .get(`/fabrics/${id}`)
    .then((response) => fabricFormatter(response?.data));
}

export { filtersDictionary, getFabrics, getFabric };
