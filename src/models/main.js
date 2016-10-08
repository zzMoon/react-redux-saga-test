export default {
    namespace: 'main',

    state: {
        path: null,
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                dispatch({
                    type: 'pathChange',
                    path: location.pathname.slice(1)
                });
            });
        }
    },

    reducers: {
        pathChange(state, payload) {
            return { ...state, path: payload.path };
        }
    },
};
