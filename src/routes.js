import React from 'react';
import { Router, Route } from 'dva/router';

import Login from 'react-router!./routes/Login';
import Main from 'react-router!./routes/Main';
import Repos from 'react-router!./routes/Repos';

/* eslint react/prop-types:0 */
export default function ({ history }) {
    return (
        <Router history={history}>
            <Route path="/" component={Login} />
            <Route path="login" component={Login} />
            <Route component={Main}>
                <Route path="release" breadcrumbName="仓库管理" component={Repos} />
            </Route>
        </Router>
    );
}
