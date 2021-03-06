import React, { PropTypes } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router';

import './Nav.scss';

function Nav({ path }) {
    return (
        <div className="menu">
            <div className="logo center">货车帮云平台</div>
            <div className="content">
                <Menu
                    selectedKeys={[path]}
                    mode="inline"
                >
                    <Menu.Item key="repo">
                        <Link to="repo"><Icon type="appstore-o" />仓库管理</Link>
                    </Menu.Item>
                </Menu>
            </div>
        </div>
    );
}

Nav.propTypes = {
    path: PropTypes.string,
};

export default Nav;
