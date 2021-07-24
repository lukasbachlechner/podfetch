export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Loading... ',
    titleTemplate: '%s – Podfetch',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/base.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/formatter.js',
    '~/plugins/swiper.js',
    '~/plugins/vee-validate.client.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/svg',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
  ],

  auth: {
    plugins: ['~/plugins/api.js'],
    strategies: {
      local: {
        user: {
          property: false,
          autoFetch: false,
        },
        token: {
          property: 'token',
        },
        endpoints: {
          login: {
            baseUrl: process.env.API_URL,
            url: 'auth/login',
            method: 'post',
          },
          logout: {
            baseUrl: process.env.API_URL,
            url: 'auth/logout',
            method: 'post',
          },
          user: {
            baseUrl: process.env.API_URL,
            url: 'auth/me',
            method: 'get',
          },
        },
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    progress: false,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
