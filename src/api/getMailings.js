import client from "./client";
import mailingsFormatter from "./formatters/mailingsFormatter";

async function getMailings(page, locale) {
  return client
    .get("/mailings/", {
      params: {
        cp: page,
        ps: 12,
        lang: locale,
      },
     
    })
    .then((response) => mailingsFormatter(response?.data));
}

export default getMailings;
