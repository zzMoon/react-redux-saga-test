import apis from '../apis';
import { setCookie } from '../utils/cookie';

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
            const { data: { token, name, role } } = yield call(apis.login.loginPost, JSON.stringify(payload));
            yield put({ type: 'btnLoading', data: false });

            setCookie('paasToken', token, 30);
            setCookie('paasUserName', payload.userName, 30);
            setCookie('paasName', name, 30);
            setCookie('paasRole', role, 30);

            location.hash = '#release';
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
