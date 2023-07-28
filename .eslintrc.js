module.exports = {
  root: true,
  env: {
    browser: true, // 识别dom api
    node: true, // 识别node api
  },
  extends: ['airbnb', 'prettier'],
  plugins: [ 'import', 'react-hooks', 'react', 'prettier'],
  rules: {
    'import/no-unresolved': [2, { commonjs: true, amd: true, caseSensitive: false }], // 添加这个
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/named': 2, // 添加这个
    'import/namespace': 2, // 添加这个
    'import/default': 2, // 添加这个
    'import/export': 2, // 添加这个
    'import/no-commonjs': 0,
    'import/extensions': 0,
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', 'tsx'] }],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          // 这里参照webpack的别名配置映射
          ['@/src', './src'],
        ],
        // 告诉resolver-alias有哪些后缀的文件要解析
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
  },

  parser: '@typescript-eslint/parser',
  parserOptions: {
    parser: 'babel-eslint',
  },
};
