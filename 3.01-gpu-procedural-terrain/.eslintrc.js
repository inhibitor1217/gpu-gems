const config = require('../config/.eslintrc')

module.exports = {
  ...config,
  parserOptions: {
    ...config.parserOptions,
    project: './tsconfig.json',
  }
}
