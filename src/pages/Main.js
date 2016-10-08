import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';

import './Main.scss';
import Nav from '../components/Main/Nav';
import Header from '../components/Main/Header';

function Main(props) {
    return (
        <div className="main">
            <Nav {...props.main} />
            <div className="container">
                <Header />
                <div className="content">
                    <div className="breadcrumb">
                        <Breadcrumb separator=">" {...props} />
                    </div>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

Main.propTypes = {
    children: PropTypes.element,
    main: PropTypes.object,
};

function mapStateToProps({ main }) {
    return { main };
}

export default connect(mapStateToProps)(Main);
