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
        getData(state, { payload }) {
            return payload;
        }
    },
};
