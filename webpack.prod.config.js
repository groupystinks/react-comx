var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/client.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url',
        query: {limit: 10240}
      },
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
    ]
  },
  resolve: {
    modulesDirectories: [
      'src',
      'components',
      'node_modules'
    ],
    extensions: ['', '.json', '.js']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        mangle: false,
        compress: {
            warnings: false
        }
    }),
    new webpack.optimize.DedupePlugin(),
  ]
};
