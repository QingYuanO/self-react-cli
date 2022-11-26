module.exports = {
  extends: ['react-app', 'prettier'], // 继承 react 官方规则
  plugins: ['prettier'],
  parserOptions: {
    babelOptions: {
      presets: [
        // 解决页面报错问题
        ['babel-preset-react-app', false],
        'babel-preset-react-app/prod',
      ],
    },
  },
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
