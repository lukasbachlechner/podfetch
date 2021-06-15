// const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
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
      sans: ['karla', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        accent: {
          DEFAULT: '#E43F5A',
          50: '#EC7B8E',
          100: '#EC7588',
          200: '#EA677D',
          300: '#E85A71',
          400: '#E64C66',
          500: '#E43F5A',
          600: '#E2324E',
          700: '#E02443',
          800: '#D71E3C',
          900: '#C91C39',
        },
        haiti: {
          DEFAULT: '#0C0921',
          50: '#201857',
          100: '#1D1651',
          200: '#191345',
          300: '#151039',
          400: '#100C2D',
          500: '#0C0921',
          600: '#080615',
          700: '#030209',
          800: '#000000',
          900: '#000000',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
