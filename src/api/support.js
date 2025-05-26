import client from './client';

async function postSupport(message, email, phone, type) {
  return client
    .post(`/${type}/support`, {
      message,
      email,
      phone,
      domain: window.location.hostname,
    })
    .then(response => response?.data);
}

export default postSupport;
