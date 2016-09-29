var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var publicPath = '';    // 静态服务器绝对路径
var assetsPath = '';    // 打包路径
var cleanDir = [];      // 要清空的目录
var cleanRootPath = ''; // 要清空的路径
var release = '20160923';

if (process.env.NODE_ENV == 'development') {                 // 开发环境
    publicPath = 'http://dev.s.56qq.cn/staticCloud/dist/dev/';
    assetsPath = path.join(__dirname, '..', 'dist', 'dev');
    cleanDir = ['dev'];
    cleanRootPath = path.join(__dirname, '..', 'dist');
} else if (process.env.NODE_ENV == 'qa') {                   // qa测试环境
    publicPath = 'http://dev.s.56qq.cn/staticCloud/dist/qa/';
    assetsPath = path.join(__dirname, '..', 'dist', 'qa');
    cleanDir = ['qa'];
    cleanRootPath = path.join(__dirname, '..', 'dist');
} else if (process.env.NODE_ENV == 'devTest') {              // 开发测试环境
    publicPath = 'http://dev.s.56qq.cn/staticCloud/dist/devTest/' + release + '/';
    assetsPath = path.join(__dirname, '..', 'dist', 'devTest', release);
    cleanDir = [release];
    cleanRootPath = path.join(__dirname, '..', 'dist', 'devTest');
} else if (process.env.NODE_ENV == 'production') {           // 正式环境
    publicPath = 'http://s.56qq.cn/staticCloud/dist/prod/' + release + '/';
    assetsPath = path.join(__dirname, '..', 'dist', 'prod', release);
    cleanDir = [release];
    cleanRootPath = path.join(__dirname, '..', 'dist', 'prod');
}

module.exports = {
    devtool: 'false',
	entry: {
        main: path.join(__dirname, '../src', 'index.js'),
        vendor: ['react', 'react-dom', 'redux', 'react-redux', 'history', 'immutable', 'react-router'],
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
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!sass') },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
        ]
    },
    resolve: {
        extensions: ['', '.js'],
        /* 指定别名，指向压缩的文件 */
        alias: {
            'react': path.join(__dirname, '../node_modules', 'react/dist/react.min'),
            'react-dom': path.join(__dirname, '../node_modules', 'react-dom/dist/react-dom.min'),
            'immutable': path.join(__dirname, '../node_modules', 'immutable/dist/immutable.min'),
        }
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.bundle.js'), // 捆绑第三方库文件
        new ExtractTextPlugin('[name].css', { allChunks: true }), // 合并sass和css文件为一个css文件
        new webpack.DefinePlugin({ // 加入这个避免redux报错
            'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"'
        }),
        new webpack.NoErrorsPlugin(),
        new CleanWebpackPlugin(cleanDir, {
            root: cleanRootPath,
            verbose: true, 
            dry: false,
        })
    ]
};
