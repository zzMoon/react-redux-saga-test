import dva from 'dva';
import createLogger from 'redux-logger';
import 'antd/dist/antd.min.css';

import './statics/styles/app.scss';
import routes from './routes';
import login from './models/login';
import main from './models/main';
import repos from './models/repos';
import repoInfo from './models/repoInfo';

const app = dva();

app.use({
    onAction: [createLogger()]
});

app.model(login);
app.model(main);
app.model(repos);
app.model(repoInfo);

app.router(routes);
app.start('#root');
