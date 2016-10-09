var fs = require('fs');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(webpackConfig, env) {

  webpackConfig.output.path = path.join(__dirname, 'dist', 'dev');

  // Support CSS Modules
  // Parse all less files as css module.
  webpackConfig.module.loaders.push(
    { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass') }
  );

  return webpackConfig;
};
