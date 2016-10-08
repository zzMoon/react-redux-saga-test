import apis from '../apis';

export default {
    namespace: 'repos',

    state: {
        list: [],
        tableLoading: false,
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname == '/repo') {
                    dispatch({ type: 'query' });
                }
            });
        }
    },

    effects: {
        * query({ payload }, { put, call }) {
            yield put({ type: 'tableLoading', tableLoading: true });
            const { data } = yield call(apis.repo.repoListGet);
            if (data) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data,
                    }
                });
            }
        },
    },

    reducers: {
        tableLoading(state, { tableLoading }) {
            return { ...state, tableLoading };
        },
        querySuccess(state, { payload }) {
            return { ...state, ...payload, tableLoading: false };
        },
    },
};
