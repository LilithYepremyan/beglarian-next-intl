import client from "./client";
import mailingFormatter from "./formatters/mailingFormatter";

async function getMailing(id) {
  return client
    .get(`/mailings/${id}`)
    .then((response) => mailingFormatter(response?.data.response));
}

export default getMailing;
