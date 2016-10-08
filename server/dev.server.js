import express from 'express';
import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import path from 'path';
import devWebpackConfig from '../webpack/dev.config';

const port = 8011;
const app = express();
const compiler = webpack(devWebpackConfig);

const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: devWebpackConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
});
const hotMiddleware = webpackHotMiddleware(compiler);

app.use(devMiddleware);
app.use(hotMiddleware);

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'dev.html'));
});

app.listen(port, () => {
    console.log(`服务器启动成功，端口：${port}`);
});
