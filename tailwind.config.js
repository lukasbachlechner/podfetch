// const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

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
        error: {
          DEFAULT: '#ff0000',
        },
        success: {
          DEFAULT: '#00ff00',
        },
      },
      screens: {
        'max-md': { max: '767px' },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    plugin(({ addComponents, addUtilities }) => {
      const newUtilities = {
        '.left-22': {
          left: '5.5rem',
        },
        '.ml-22': {
          marginLeft: '5.5rem',
        },
        '.mt-27': {
          marginTop: '6.75rem',
        },
        '.h-27': {
          height: '6.75rem',
        },
      };

      addUtilities(newUtilities, ['responsive']);

      const newComponents = {
        '.ellipsis': {
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        },
      };
      addComponents(newComponents);
    }),
  ],
};
