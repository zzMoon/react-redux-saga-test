import React, { PropTypes } from 'react';
import { connect } from 'dva';

import RepoInfo from '../components/Repo/RepoInfo';

function RepoCreate({ dispatch, repoInfo }) {
    function onSubmit(values) {
        dispatch({ type: 'repoInfo/create', payload: values });
    }

    return (
        <div className="cloud-wrap">
            <RepoInfo
                onSubmit={onSubmit}
                repoInfo={repoInfo}
                pageType="create"
            />
        </div>
    );
}

RepoCreate.propTypes = {
    dispatch: PropTypes.func,
    repoInfo: PropTypes.object,
};

function mapStateToProps({ repoInfo }) {
    return { repoInfo };
}

export default connect(mapStateToProps)(RepoCreate);
