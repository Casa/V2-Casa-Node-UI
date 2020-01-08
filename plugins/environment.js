import cookie from 'cookie';
const POLLING_MS = 20000;

export default function (context, inject) {
  const cookies = cookie.parse(document.cookie);
  let apiUrl = cookies.DEVICE_HOST;

  if(window.location.href.includes('.onion')) {
    apiUrl = cookies.CASA_NODE_HIDDEN_SERVICE;
  }

  context.$env = {
    API_MANAGER: `${apiUrl}:3000`,
    API_LND: `${apiUrl}:3002`,
    BITCOIN_EXPLORER: cookies.BITCOIN_EXPLORER,
    LIGHTNING_EXPLORER: cookies.LIGHTNING_EXPLORER,
    REFRESH_RATE: POLLING_MS
  };

  context.$auth.strategies.local.options.endpoints.login = {
    url: `${context.$env.API_MANAGER}/v1/accounts/login`,
    method: 'post',
    propertyName: 'jwt'
  };

  inject('env', context.$env);
}
