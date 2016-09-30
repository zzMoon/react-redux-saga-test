export default {
    namespace: 'login',

    state: {
        username: 'gogo',
        password: '123456',
        loginBtnLoading: false,
    },

    reducers: {
        inputChange(state, payload) {
            return { ...state, ...payload.data, loginBtnLoading: false };
        }
    },
};
