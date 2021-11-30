const _ = require('lodash')
const config = require('../config/.eslintrc')

module.exports = _.merge(
  config,
  {
    extends: [
      'airbnb',
      'airbnb-typescript',
    ],
    parserOptions: {
      project: './tsconfig.json',
    },
    rules: {
      '@typescript-eslint/semi': ['error', 'never'],
      'array-callback-return': 'off',
      'implicit-arrow-linebreak': 'off',
      'react/function-component-definition': 'off',
      "react/jsx-uses-react": 'off',
      "react/react-in-jsx-scope": 'off',
    },
  }
)
