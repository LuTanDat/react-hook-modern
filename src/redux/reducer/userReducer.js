
import {
  USER_LOGOUT_SUCCESS, USER_REFRESH_TOKEN_SUCCESS,
  FETCH_USERS_PENDING, FETCH_USERS_SUCCESS, FETCH_USERS_ERROR,
  LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR,
  LOGOUT_PENDING, LOGOUT_SUCCESS, LOGOUT_ERROR
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
  listUsers: [],
  isLoading: false,
  error: null,
  isLogouted: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        account: {
          access_token: action?.payload?.DT.access_token,
          email: action?.payload?.DT.email,
          username: action?.payload?.DT.username,
          role: action?.payload?.DT.role,
          image: action?.payload?.DT.image,
        },
        isAuthenticated: true,
        isLogouted: false, // ✅ Khi login thành công, reset trạng thái isLogouted
      };

    case LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case LOGOUT_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        account: {
          access_token: '',
          email: '',
          username: '',
          role: '',
          image: ''
        },
        isAuthenticated: false,
        listUsers: [],
        isLogouted: true,
      };

    case LOGOUT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
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

    // Xử lý danh sách người dùng
    case FETCH_USERS_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listUsers: action.payload,
      };

    case FETCH_USERS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default: return state;
  }
};

export default userReducer;