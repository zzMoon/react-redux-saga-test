import apis from '../apis';

export default {
    namespace: 'login',

    state: {
        username: 'xiaotian.zhang@56qq.com',
        password: '123456',
        btnLoading: false,
    },

    effects: {
        * login({ payload }, { put, call }) {
            yield put({ type: 'btnLoading', data: true });
            yield call(apis.login.loginPost, payload);
            yield put({ type: 'btnLoading', data: false });
        },
    },

    reducers: {
        btnLoading(state, payload) {
            return { ...state, btnLoading: payload.data };
        },
        inputChange(state, payload) {
            return { ...state, ...payload.data, btnLoading: false };
        }
    },
};
