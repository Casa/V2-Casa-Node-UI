require('dotenv').config();

/*
** Environment variables exposed to the front end
*/
const env = {
  DEVICE_HOST: process.env.DEVICE_HOST,
  CASA_NODE_HIDDEN_SERVICE: process.env.CASA_NODE_HIDDEN_SERVICE,

  // Default to mainnet explorers, but allow developers to override with testnet
  BITCOIN_EXPLORER: process.env.BITCOIN_EXPLORER || 'https://blockstream.info/tx/',
  LIGHTNING_EXPLORER: process.env.LIGHTNING_EXPLORER || 'https://explore.casa/nodes/'
};

export default {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Casa Node 2',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Financial Sovereignty by Casa' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/filters' },
    { src: '~/plugins/interceptor' },
    { src: '~/plugins/global-components' },
    { src: '~/plugins/vee-validate' },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Docs: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',
    // Docs: https://axios.nuxtjs.org
    '@nuxtjs/axios',
    // Docs: https://auth.nuxtjs.org/guide
    '@nuxtjs/auth',
  ],

  /*
  ** Auth module configuration
  */
  auth: {
    strategies: {
      local: {
        // The Nuxt auth module expects specific endpoints for logging in and getting user data which we don't need
        endpoints: {
          login: false,
          user: false,
          logout: false,
          loading: false,
        },

        tokenType: 'JWT'
      },
    },

    plugins: [
      { src: '~/plugins/environment' },
    ]
  },

  /*
  ** Build configuration
  */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if(ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  },

  /*
  ** Client-side middleware called on every page
  */
  router: {
    middleware: [
      'loading'
    ],
  },

  /*
  ** Server middlware to expose environment variables at runtime
  */
  serverMiddleware: [
    function(req, res, next) {
      const cookies = [];

      Object.entries(env).forEach(([key, value]) => {
        cookies.push(`${key}=${JSON.stringify(value)}`);
      });

      res.setHeader('Set-Cookie', cookies);
      next();
    }
  ],
}
