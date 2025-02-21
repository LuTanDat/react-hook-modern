export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS'
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS'
export const USER_REFRESH_TOKEN_SUCCESS = 'USER_REFRESH_TOKEN_SUCCESS'

export const doLogin = (data) => {
  return {
    type: FETCH_USER_LOGIN_SUCCESS,
    payload: data,
  };
}

export const doLogout = () => {
  return {
    type: USER_LOGOUT_SUCCESS
  }
};

export const refreshToken = (access_token) => {
  return {
    type: USER_REFRESH_TOKEN_SUCCESS,
    payload: access_token,
  }
};