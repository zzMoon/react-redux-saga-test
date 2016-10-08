import React, { PropTypes } from 'react';
import { connect } from 'dva';

import Nav from '../components/Main/Nav';

function Main({
    children,
    main,
}) {
    console.log(main);
    return (
        <div>
            <Nav {...main} />
            {children}
        </div>
    );
}

Main.propTypes = {
    children: PropTypes.element,
};

function mapStateToProps({ main }) {
    return { main };
}

export default connect(mapStateToProps)(Main);
