module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      browsersList: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
      flexbox: 'no-2009',
    },
  },
};
