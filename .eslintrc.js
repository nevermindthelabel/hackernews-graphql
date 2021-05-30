module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
    es2021: true
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': 'error'
  },
  plugins: ['prettier', 'graphql']
};
