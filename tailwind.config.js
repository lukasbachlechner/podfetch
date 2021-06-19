// const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'jit' : undefined,
  purge: {
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
      // TypeScript
      'plugins/**/*.ts',
      'nuxt.config.ts',
    ],
  },
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    fontFamily: {
      sans: ['Satoshi-Variable', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        accent: {
          DEFAULT: '#f24162',
          middle: '#f06680',
        },
        haiti: {
          DEFAULT: '#0C0921',
          middle: '#151039',
          high: '#191345',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
