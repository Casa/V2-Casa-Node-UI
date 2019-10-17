import Vue from 'vue';
import {satsToBtc, btcToSats, formatSats} from '@/helpers/units';

// Convert Satoshis to Bitcoin
Vue.filter('btc', value => satsToBtc(value));

// Convert Bitcoin to Satoshis
Vue.filter('sats', value => btcToSats(value));

/**
 * Vue filter to convert the given value to percent.
 *
 * @param {String} value    The value string.
 * @param {Number} decimals The number of decimal places.
 */
Vue.filter('percentage', function(value, decimals) {
  if(!value) {
    value = 0;
  }

  if(!decimals) {
    decimals = 0;
  }

  value = value * 100;
  value = Math.floor(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  value = value + '%';
  return value;
});
