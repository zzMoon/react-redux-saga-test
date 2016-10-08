import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';

import pages from './pages';

/* eslint react/prop-types:0 */
export default function ({ history }) {
    return (
        <Router history={history}>
            <Route path="/" component={pages.Login} />
            <Route path="login" component={pages.Login} />
            <Route component={pages.Main}>
                <Route path="repo" breadcrumbName="仓库管理">
                    <IndexRoute breadcrumbName="列表" component={pages.Repos} />
                    <Route path="create" breadcrumbName="新建" component={pages.RepoCreate} />
                    <Route path="update" breadcrumbName="修改" component={pages.RepoUpdate} />
                </Route>
            </Route>
        </Router>
    );
}
