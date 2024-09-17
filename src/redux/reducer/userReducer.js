
import { FETCH_USER_LOGIN_SUCCESS } from '../action/userAction';

const INITIAL_STATE = {
    account: {},
    isAuthenticated: false,

};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            return {
                ...state, account: action.payload.DT, isAuthenticated: true,
            };

        default: return state;
    }
};

export default userReducer;