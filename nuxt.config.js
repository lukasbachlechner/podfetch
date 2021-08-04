export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Loading... ',
    titleTemplate:
      '%s – Podfetch – Listen to podcasts online and offline, for free.',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no',
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'Podfetch is a web-based podcast client. You can stream and download episodes on the go, as well as subscribe to your favorite shows. Sign up now to start your free listening experience!',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Podfetch – Listen to podcasts online and offline, for free.',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'Podfetch',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: process.env.URL + '/podfetch.png',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Podfetch is a web-based podcast client. You can stream and download episodes on the go, as well as subscribe to your favorite shows. Sign up now to start your free listening experience!',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' },
      {
        rel: 'apple-touch-icon',
        type: 'image/png',
        href: '/apple-touch-app-icon.png',
      },
    ],
  },

  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/base.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/formatter.js',
    '~/plugins/notify.js',
    '~/plugins/storage.js',
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
    '@nuxtjs/localforage',
  ],

  localforage: {
    instances: [
      {
        name: 'podfetch',
        storeName: 'savedEpisodeData',
      },
      {
        name: 'podfetch',
        storeName: 'savedAudioFiles',
      },
    ],
  },

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
          maxAge: 604800,
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
      name: 'Podfetch',
    },
    meta: {
      appleStatusBarStyle: 'black',
      name: 'Podfetch',
      theme_color: '#0C0921',
      nativeUI: true,
    },
    icon: {
      fileName: 'app-icon.png',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
