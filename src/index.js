import dva from 'dva';
import 'antd/dist/antd.min.css';

import './statics/styles/app.scss';
import routes from './routes';
import login from './models/login';

const app = dva();

app.model(login);
app.router(routes);
app.start('#root');
