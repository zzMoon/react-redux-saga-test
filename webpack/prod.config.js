var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var publicPath = '';
var assetsPath = '';
var cleanDir = [];      // 要清空的目录
var cleanRootPath = ''; // 要清空的路径
var release = '20160927';

switch(process.env.NODE_ENV) {
    // 开发环境
    case 'dev':
        publicPath = 'http://dev.s.56qq.cn/staticGalileo/dist/dev/';
        assetsPath = path.join(__dirname, '..', 'dist', 'dev');
        cleanDir = ['dev'];
        cleanRootPath = path.join(__dirname, '..', 'dist');
        break;
    // 测试环境
    case 'qa':
        publicPath = 'http://dev.s.56qq.cn/staticGalileo/dist/qa/';
        assetsPath = path.join(__dirname, '..', 'dist', 'qa');
        cleanDir = ['qa'];
        cleanRootPath = path.join(__dirname, '..', 'dist');
        break;
    // 开发测试环境
    case 'devTest':
        publicPath = 'http://dev.s.56qq.cn/staticGalileo/dist/devTest/' + release + '/';
        assetsPath = path.join(__dirname, '..', 'dist', 'devTest', release);
        break;
    // 正式环境
    case 'production':
        publicPath = 'http://s.56qq.cn/staticGalileo/dist/prod/' + release + '/';
        assetsPath = path.join(__dirname, '..', 'dist', 'prod', release);
        break;
    default:
        break;
}

module.exports = {
    devtool: 'false',
	entry: {
        main: [
            path.join(__dirname, '../src', 'index.js')
        ],
        vendor: ['react', 'react-dom']
    },
    output: {
        path: assetsPath,
        filename: 'bundle.js',
        chunkFilename: '[name].[chunkhash:8].js',
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'raw') },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass') },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
            { test: /\.(jpg|png|gif)$/, loader: 'url?limit=8192&name=images/[name].[hash:8].[ext]' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
        ]
    },
    resolve: {
        extensions: ['', '.js']
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: "jquery",
            "window.jQuery": "jquery",
        }),
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
