import React from 'react';
import { Router, Route } from 'dva/router';

import Login from 'react-router!./pages/Login';
import Main from 'react-router!./pages/Main';
import Releases from 'react-router!./pages/Releases';

/* eslint react/prop-types:0 */
export default function ({ history }) {
    return (
        <Router history={history}>
            <Route path="/" component={Login} />
            <Route path="login" component={Login} />
            <Route component={Main}>
                <Route path="release" component={Releases} />
            </Route>
        </Router>
    );
}
