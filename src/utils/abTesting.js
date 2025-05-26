/* eslint-disable no-cond-assign */

import { getClientCookie, setClientCookie } from './cookies';

const EXPERIMENTS = [
  // Example experiment configuration
  {
    name: 'progressive-discount',
    from: 75,
    to: 100,
  },
];

const getCryptoRandom = () => {
  if (typeof window === 'undefined') return 0;
  try {
    let cryptoRandoms = [];
    const cryptoRandomSlices = [];

    let cryptoRandom = '';

    while ((cryptoRandom = `.${cryptoRandomSlices.join('')}`).length < 30) {
      cryptoRandoms = (window.crypto || window.msCrypto).getRandomValues(new Uint32Array(5));

      for (let i = 0; i < cryptoRandoms.length; i += 1) {
        const cryptoRandomSlice = cryptoRandoms[i] < 4000000000 ? cryptoRandoms[i].toString().slice(1) : '';

        if (cryptoRandomSlice.length > 0) {
          cryptoRandomSlices[cryptoRandomSlices.length] = cryptoRandomSlice;
        }
      }
    }
    return Number(cryptoRandom);
  } catch (e) {
    return Math.random();
  }
};

let currentExperiment = getClientCookie('bfExperiment');
let currentExperimentPercent = getClientCookie('bfExperimentPercent');

function init() {
  if (!currentExperimentPercent) {
    currentExperimentPercent = Math.round(getCryptoRandom() * 100);

    // Set the bfExperimentPercent cookie for 1 year
    setClientCookie('bfExperimentPercent', currentExperimentPercent, 365);
  }

  currentExperiment = EXPERIMENTS.reduce((value, experiment) => {
    const { name, from, to } = experiment;

    if (currentExperimentPercent >= from && currentExperimentPercent < to) {
      return name;
    }

    return value;
  }, 'none');

  // Set the bfExperiment cookie for 1 year
  setClientCookie('bfExperiment', currentExperiment, 365);
}

function hasExperiment(experimentName) {
  return currentExperiment === experimentName;
}

function getExperiment() {
  return currentExperiment || 'none';
}

function isNewCheckout() {
  const value = getClientCookie('bfCheckout');
  return value !== undefined && value !== null;
}

// Export functions
export { init, hasExperiment, getExperiment, isNewCheckout };
