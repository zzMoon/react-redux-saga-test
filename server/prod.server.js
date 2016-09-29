import 'babel-core/register';
import express from 'express';
import path from 'path';

const port = 8080;
const app = express();

app.use(express.static('dist/dev'));

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'prod.html'));
});

app.listen(port, () => {
    console.log(`服务器启动成功，端口：${port}`);
});
