const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = require('../config/webpack.config')

module.exports = {
  ...config,
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(process.cwd(), 'public/index.html'),
    }),
  ],
}
