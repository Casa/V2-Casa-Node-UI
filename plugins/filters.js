import Vue from 'vue';
import { satsToBtc, btcToSats } from '@/helpers/units';
import relativeTime from 'dayjs/plugin/relativeTime';

const dayjs = require('dayjs');
dayjs.extend(relativeTime);

export default ({ app: { store } }) => {
  // Convert Satoshis to Bitcoin
  Vue.filter('btc', value => satsToBtc(value));

  // Convert Bitcoin to Satoshis
  Vue.filter('sats', value => btcToSats(value));

  // Display a number based on the browser's language settings (comma, period, space, etc.)
  Vue.filter('localized', value => {
    return Number(value).toLocaleString();
  });

  // Display correct denomination based on global state
  Vue.filter('units', value => {
    if (store.getters['system/getUnits'] === 'sats') {
      return Number(value).toLocaleString();
    } else {
      const btcValue = satsToBtc(value);
      return Number(btcValue).toLocaleString();
    }
  });

  // Convert Satoshis to USD
  Vue.filter('usd', value => {
    // If the value passed is not a number, output it as is
    if (isNaN(parseInt(value))) {
      return value;
    } else {
      return '$' + (satsToBtc(value) * store.state.bitcoin.price).toFixed(2);
    }
  });

  /**
   * Vue filter to convert the given value to percent.
   *
   * @param {String} value    The value string.
   * @param {Number} decimals The number of decimal places.
   */
  Vue.filter('percentage', function(value, decimals) {
    if (!value) {
      value = 0;
    }

    if (!decimals) {
      decimals = 0;
    }

    value = value * 100;
    value = Math.floor(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
    value = value + '%';
    return value;
  });
  
  /**
  * Convert a time stamp into human readable relative time
  * @param {timestamp} unix date stamp.
  */
  Vue.filter('timeAgo', function (timestamp) {
    return dayjs().to(dayjs(timestamp * 1000));
  });
};
