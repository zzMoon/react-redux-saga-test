import apis from '../apis';
import { ps } from '../configs/configureBase';

export default {
    namespace: 'releases',

    state: {
        pn: null,
        total: null,
        appName: null,
        releaseStatu: null,
        departmentCode: null,
        deployType: null,
        releaseInfoList: [],
        tableLoading: false,
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname == '/release') {
                    dispatch({
                        type: 'query',
                        payload: { pn: 1, ps }
                    });
                }
            });
        }
    },

    effects: {
        * query({ payload }, { put, call }) {
            // yield put({ type: 'showLoading', tableLoading: true });
            const { data } = yield call(apis.release.releaseListGet, payload);
            if (data) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        releaseInfoList: data.releaseInfoList,
                        total: data.total,
                    },
                });
            }
            // yield put({ type: 'showLoading', tableLoading: false });
        },
    },

    reducers: {
        tableLoading(state, { tableLoading }) {
            return { ...state, tableLoading };
        },
        querySuccess(state, action) {
            return { ...state, ...action.payload, tableLoading: false };
        },
    },
};
