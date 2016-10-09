var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var publicPath = '';    // 静态服务器绝对路径
var assetsPath = '';    // 打包路径
var cleanDir = [];      // 要清空的目录
var cleanRootPath = ''; // 要清空的路径
var release = '20160923';
var NODE_ENV = process.env.NODE_ENV;

switch(NODE_ENV) {
    case 'dev': // 开发环境
    case 'qa': // 测试环境
        publicPath = 'http://dev.s.56qq.cn/staticCloud/dist/' + NODE_ENV + '/';
        assetsPath = path.join(__dirname, '..', 'dist', NODE_ENV);
        cleanDir = [NODE_ENV];
        cleanRootPath = path.join(__dirname, '..', 'dist');
        break;

    case 'devTest': // 开发测试环境
    case 'prod': // 正式环境
        publicPath = NODE_ENV == 'devTest' ?
            'http://dev.s.56qq.cn/staticCloud/dist/devTest/' + release + '/' :
            'http://s.56qq.cn/staticCloud/dist/prod/' + release + '/';
        assetsPath = path.join(__dirname, '..', 'dist', NODE_ENV, release);
        cleanDir = [release];
        cleanRootPath = path.join(__dirname, '..', 'dist', NODE_ENV);
        break;

    default:
        break;
}

module.exports = {
    devtool: 'false',
	entry: {
        main: path.join(__dirname, '../src', 'index.js'),
    },
    output: {
        path: assetsPath,
        filename: 'bundle.js',
        chunkFilename: '[name].[chunkhash:8].js',
        publicPath: publicPath
    },
    module: {
        loaders: [
            { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
            { test: /\.css?$/, loader: ExtractTextPlugin.extract('style', 'raw') },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass') },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff' },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/octet-stream' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=image/svg+xml' },
            { test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i, loader: 'url?limit=10000' },
            { test: /\.json$/, loader: 'json' },
            { test: /\.html?$/, loader: 'file?name=[name].[ext]' },
        ]
    },
    resolve: {
        modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions: ['', '.js'],
    },
    resolveLoader: {
      modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('[name].css', { allChunks: true }), // 合并sass和css文件为一个css文件
        new webpack.DefinePlugin({ // 加入这个避免redux报错
            'process.env.NODE_ENV': '"' + NODE_ENV == 'prod' ? 'production' : NODE_ENV + '"'
        }),
        new webpack.NoErrorsPlugin(),
        new CleanWebpackPlugin(cleanDir, {
            root: cleanRootPath,
            verbose: true, 
            dry: false,
        })
    ]
};
