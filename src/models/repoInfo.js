import apis from '../apis';

export default {
    namespace: 'repoInfo',

    state: {
        version: 'v2',
        name: null,
        domain: null,
        account: null,
        password: null,
        btnLoading: false,
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname == '/repo') {
                }
            });
        }
    },

    effects: {
        * create({ payload }, { put, call }) {
            yield put({ type: 'btnLoading', btnLoading: true });
            try {
                yield call(apis.repo.repoPost, JSON.stringify(payload));
            } catch (e) {
                yield put({ type: 'btnLoading', btnLoading: false });
            }
        },
    },

    reducers: {
        btnLoading(state, { btnLoading }) {
            return { ...state, btnLoading };
        },
        createSuccess(state, { payload }) {
            return { ...state, ...payload, btnLoading: false };
        },
    },
};
