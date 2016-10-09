import apis from '../apis';

const initialState = {
    version: 'v2',
    name: null,
    domain: null,
    account: null,
    password: null,
    btnLoading: false,
};

export default {
    namespace: 'repoInfo',

    state: initialState,

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname == '/repo/create') {
                    dispatch({ type: 'clear' });
                }
            });
        },
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
        },
        clear(state) {
            return { ...state, ...initialState };
        }
    },
};
