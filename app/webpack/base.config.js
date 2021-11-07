const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  output: {
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.wgsl$/,
        use: 'raw-loader',
      },
    ],
  },
  resolve: {
    alias: {
      'App': path.resolve(__dirname, '..', 'src', 'app'),
      'Common': path.resolve(__dirname, '..', 'src', 'common'),
      'Routes': path.resolve(__dirname, '..', 'src', 'routes'),
      'Styles': path.resolve(__dirname, '..', 'src', 'styles'),
      'Types': path.resolve(__dirname, '..', 'src', 'types'),
      'Util': path.resolve(__dirname, '..', 'src', 'util'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'public/index.html'),
    }),
  ],
}
