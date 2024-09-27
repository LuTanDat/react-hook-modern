
import { FETCH_USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from '../action/userAction';

const INITIAL_STATE = {
    account: {
        access_token: null,
        refresh_token: null,
        username: '',
        role: '',
        email: '',
        image: ''
    },
    isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            return {
                ...state, account: action.payload.DT, isAuthenticated: true,
            };
        case USER_LOGOUT_SUCCESS:
            return {
                ...state, account: {}, isAuthenticated: false,
            };
        case 'UPDATE_TOKENS':
            return {
                ...state,
                account: {
                    ...state.account,
                    access_token: action.payload.access_token,
                    refresh_token: action.payload.refresh_token,
                },
            };

        default: return state;
    }
};

export default userReducer;