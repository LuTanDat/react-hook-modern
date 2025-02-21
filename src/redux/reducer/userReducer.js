
import {
  FETCH_USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS,
  USER_REFRESH_TOKEN_SUCCESS,

} from '../action/userAction';

const INITIAL_STATE = {
  account: {
    access_token: '',
    email: '',
    username: '',
    role: '',
    image: ''
  },
  isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCCESS:
      return {
        ...state,
        account: {
          access_token: action?.payload?.DT.access_token,
          email: action?.payload?.DT.email,
          username: action?.payload?.DT.username,
          role: action?.payload?.DT.role,
          image: action?.payload?.DT.image,
        },
        isAuthenticated: true,
      };

    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        account: {
          access_token: '',
          email: '',
          username: '',
          role: '',
          image: ''
        },
        isAuthenticated: false,
      };

    case USER_REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        account: {
          ...state.account,
          access_token: action?.payload
        },
        isAuthenticated: true,
      };

    default: return state;
  }
};

export default userReducer;