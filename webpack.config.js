var Promise = require('es6-promise').Promise;

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/client.js',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  module: {
    // preLoaders: [
    //   { test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader' },
    // ],
    loaders: [
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url',
        query: {limit: 10240},
      },
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loaders: ['react-hot', 'babel'],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'),
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  postcss: [
    require('autoprefixer-core'),
    require('postcss-color-rebeccapurple'),
  ],
  resolve: {
    modulesDirectories: [
      'src',
      'components',
      'node_modules',
    ],
    extensions: ['', '.json', '.js'],
  },
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
  ],
};
