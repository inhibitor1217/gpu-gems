const path = require('path')

module.exports = {
  mode: 'production',
  entry: path.join(process.cwd(), 'src', 'index.ts'),
  output: {
    filename: 'bundle.js',
    path: path.join(process.cwd(), 'build'),
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.wgsl$/,
        use: 'raw-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
    modules: [path.resolve(process.cwd(), 'src'), path.resolve(process.cwd(), 'node_modules')],
  },
  devServer: {
    contentBase: path.resolve(process.cwd(), 'public'),
    compress: true,
    port: 3000,
  },
}
