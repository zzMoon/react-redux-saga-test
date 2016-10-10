var webpack = require('atool-build/lib/webpack');
var fs = require('fs');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var publicPath = '';    // 静态服务器绝对路径
var assetsPath = '';    // 打包路径
var cleanDir = [];      // 要清空的目录
var cleanRootPath = ''; // 要清空的路径
var release = '20160923';
var NODE_ENV = process.env.NODE_ENV;

switch (NODE_ENV) {
    case 'dev': // 开发环境
    case 'qa': // 测试环境
        publicPath = 'http://dev.s.56qq.cn/staticCloud/dist/' + NODE_ENV + '/';
        assetsPath = path.join(__dirname, 'dist', NODE_ENV);
        cleanDir = [NODE_ENV];
        cleanRootPath = path.join(__dirname, 'dist');
        break;

    case 'devTest': // 开发测试环境
    case 'prod': // 正式环境
        publicPath = NODE_ENV == 'devTest' ?
            'http://dev.s.56qq.cn/staticCloud/dist/devTest/' + release + '/' :
            'http://s.56qq.cn/staticCloud/dist/prod/' + release + '/';
        assetsPath = path.join(__dirname, 'dist', NODE_ENV, release);
        cleanDir = [release];
        cleanRootPath = path.join(__dirname, 'dist', NODE_ENV);
        break;

    default:
        break;
}

module.exports = function (webpackConfig, env) {
    webpackConfig.output.path = path.join(__dirname, 'dist', 'dev');
    webpackConfig.output.filename = 'bundle.js';
    webpackConfig.output.publicPath = publicPath;

    webpackConfig.module.loaders.push(
        { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass') }
    );

    webpackConfig.plugins.push(
        new CleanWebpackPlugin(cleanDir, {
            root: cleanRootPath,
            verbose: true,
            dry: false,
        })
    );

    return webpackConfig;
};
