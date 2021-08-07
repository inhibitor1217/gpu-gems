const path = require('path')

function isProduction() {
  return process.env.NODE_ENV === 'production'
}

module.exports = {
  mode: isProduction() ? 'production' : 'development',
  entry: path.join(process.cwd(), 'src', 'index.ts'),
  output: {
    filename: 'bundle.js',
    path: path.join(process.cwd(), 'build'),
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.tsx'],
    modules: [path.resolve(process.cwd(), 'src'), path.resolve(process.cwd(), 'node_modules')],
  },
  devServer: {
    contentBase: path.resolve(process.cwd(), 'public'),
    compress: true,
    port: 3000,
  },
}
