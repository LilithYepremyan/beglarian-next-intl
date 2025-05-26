import mailingFormatter from "./mailingFormatter";

export default function mailingsFormatter(unformattedData) {
  const { data, totalPages: pagesTotal, page } = unformattedData.response || {};

  const mailings = data.map((x) => mailingFormatter(x));

  return {
    mailings,
    pagesTotal,
    page,
  };
}
