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
    }
  }
)
