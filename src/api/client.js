import axios from 'axios';

let userToken = 'anonymous';
let utm_params = {};
let lang = 'en';

if (typeof window !== 'undefined') {
  userToken = localStorage.getItem('bfUserToken') || 'anonymous';

  const params = new URL(window.location.href).searchParams;
  utm_params = {
    utm_mailing: params.get('utm_mailing'),
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
    utm_term: params.get('utm_term'),
    utm_content: params.get('utm_content'),
    utm_landing: params.get('utm_landing'),
  };

  // язык из pathname, например: /ru/page
  const pathLocale = window.location.pathname.split('/')[1];
  lang = ['en', 'ru'].includes(pathLocale) ? pathLocale : 'en';
}

let apiHostname = '/api/1.0';

if (process.env.NEXT_PUBLIC_MODE === 'development') {
  apiHostname = 'https://test.beautyfabrics.com/api/1.0';
}

const client = axios.create({
  baseURL: apiHostname,
  params: {
    lang,
    ...utm_params,
  },
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
});

export default client;
