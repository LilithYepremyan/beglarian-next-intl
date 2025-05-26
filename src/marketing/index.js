/* eslint-disable no-console */

import marketingEvents from './marketingEvents';

const trackGTagEvent = (event, params) => {
  const eventName = event?.gt;

  if (window?.dataLayer && eventName) {
    gtag('event', eventName, params);
  }
};

const trackYaCounterEvent = (event, params) => {
  const eventName = event?.ya;

  if (window?.ym && eventName) {
    window.ym(process.env.YANDEX_PIXEL_ID, 'reachGoal', eventName, params);
  }
};

const trackFbEvent = (event, params) => {
  const eventName = event?.fb;

  if (window?.fbq && eventName) {
    window.fbq('track', eventName, params);
  }
};

const trackPtEvent = (event, params) => {
  const eventName = event?.pt;

  if (window?.pintrk && eventName) {
    window.pintrk('track', eventName, { event_id: `${eventName}_${Date.now()}`, ...params });
  }
};

const trackMarketingEvent = (event, props) => {
  if (process.env.MODE === 'development' || process.env.MODE === 'test') {
    console.log('MARKETING EVENT:', { event, props });
  }

  trackGTagEvent(event, props);
  trackYaCounterEvent(event, props);
  trackFbEvent(event, props);
  trackPtEvent(event, props);
};

export { trackMarketingEvent, marketingEvents };
