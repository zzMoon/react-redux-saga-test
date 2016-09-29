import dva from 'dva';

import routes from './routes';

const app = dva();

app.router(routes);

app.start('#root');
