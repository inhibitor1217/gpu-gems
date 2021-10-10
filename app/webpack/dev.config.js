const _ = require('lodash')
const path = require('path')

const baseConfig = require('./base.config')

const port = process.env.PORT || 3000;

module.exports = _.merge(baseConfig, {
  mode: 'development',
  entry: ['react-hot-loader/patch', path.resolve(__dirname, '..', 'src/index.tsx')],
  devServer: {
    host: 'localhost',
    port: port,
    open: true,
    hot: true,
    static: {
      directory: path.resolve(__dirname, '..', 'public'),
    },
  },
})
