import React, { PropTypes } from 'react';
import { connect } from 'dva';

import RepoInfo from '../components/Repo/RepoInfo';

function RepoUpdate({ dispatch, repoInfo }) {
    function onSubmit(values) {
        dispatch({ type: 'repoInfo/update', payload: values });
    }

    return (
        <div className="cloud-wrap">
            <RepoInfo
                onSubmit={onSubmit}
                repoInfo={repoInfo}
            />
        </div>
    );
}

RepoUpdate.propTypes = {
    dispatch: PropTypes.func,
    repoInfo: PropTypes.object,
};

function mapStateToProps({ repoInfo }) {
    return { repoInfo };
}

export default connect(mapStateToProps)(RepoUpdate);
