import cookie from 'cookie';

export default function (context, inject) {
  const cookies = cookie.parse(document.cookie);
  let apiUrl = cookies.DEVICE_HOST;

  if(window.location.href.includes('.onion')) {
    apiUrl = cookies.CASA_NODE_HIDDEN_SERVICE;
  }

  context.$env = {
    API_MANAGER: `${apiUrl}:3000`,
    UPDATE_MANAGER: `${apiUrl}:3001`,
    API_LND: `${apiUrl}:3002`,
    BITCOIN_EXPLORER: cookies.BITCOIN_EXPLORER,
    LIGHTNING_EXPLORER: cookies.LIGHTNING_EXPLORER,
  };

  inject('env', context.$env);
}
