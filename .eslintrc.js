module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: 'airbnb',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-use-before-define': 'off',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'react/destructuring-assignment': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
  },
};
