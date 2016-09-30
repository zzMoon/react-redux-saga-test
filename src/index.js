import dva from 'dva';
import createLogger from 'redux-logger';
import 'antd/dist/antd.min.css';

import './statics/styles/app.scss';
import routes from './routes';
import login from './models/login';

const app = dva();

app.use({
    onAction: [createLogger()]
});
app.model(login);
app.router(routes);
app.start('#root');
