import React, { PropTypes } from 'react';
import { Icon } from 'antd';

import { getCookieValue } from '../../utils/cookie';
import './Header.scss';

function Header({ logout }) {
    const name = getCookieValue('paasName');

    return (
        <div className="header">
            <span className="list fr">
                {name} &nbsp; <Icon type="logout" style={{ cursor: 'pointer' }} onClick={logout} />
            </span>
        </div>
    );
}

Header.propTypes = {
    logout: PropTypes.func,
};

export default Header;
