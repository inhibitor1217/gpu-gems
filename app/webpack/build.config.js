const _ = require('lodash')
const path = require('path');

const baseConfig = require('./base.config')

module.exports = _.merge(baseConfig, {
  mode: 'production',
  entry: [path.resolve(__dirname, '..', 'src/index.tsx')],
  output: {
    path: path.resolve(__dirname, '..', 'build'),
  },
})
