var path = require('path');
var webpack = require('webpack');

var buildEnv = process.env.BUILD || 'dev';

module.exports = {
  entry: {
    lib: './src/index.js',
    test: './test/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    root: [
      __dirname
    ],
    extensions: ['', '.js']
  },
  watch: true,
  module: {
    loaders: [
      { test: /src\/.*\.js$/, loader: 'babel?stage=2', exclude: /node_modules/ },
      { test: /test\/.*\.js$/, loader: 'babel?stage=2' }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
