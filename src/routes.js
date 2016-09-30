import React from 'react';
import { Router, Route } from 'dva/router';

import IndexPage from 'react-router!./pages/IndexPage';
import Login from 'react-router!./pages/Login';

export default function ({ history }) {
    return (
        <Router history={history}>
            <Route path="/" component={IndexPage} />
            <Route path="/login" component={Login} />
        </Router>
    );
}
