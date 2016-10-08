import React from 'react';
import { Router, Route } from 'dva/router';

import Login from 'react-router!./pages/Login';

/* eslint react/prop-types:0 */
export default function ({ history }) {
    return (
        <Router history={history}>
            <Route path="/" component={Login} />
            <Route path="/login" component={Login} />
        </Router>
    );
}
