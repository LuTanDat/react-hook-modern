/**
 * EC: 1 -> "Bạn chưa truyền Access Token ở Header".
 * EC: 2 -> "Access Token không hợp lệ"                   -> reLogin
 * EC: 3 -> "Người dùng không tồn tại hoặc đã bị xóa"     -> reLogin
 * EC: 4 -> "Access Token đã hết hạn"                     -> refresh token
 */

import { postLogin, postLogout, getAllUsers } from "../../services/apiServices";

export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS'
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS'
export const USER_REFRESH_TOKEN_SUCCESS = 'USER_REFRESH_TOKEN_SUCCESS'

export const LOGIN_PENDING = "LOGIN_PENDING";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const LOGOUT_PENDING = "LOGOUT_PENDING";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

export const FETCH_USERS_PENDING = 'FETCH_USERS_PENDING';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';


export const refreshToken = (access_token) => {
  return {
    type: USER_REFRESH_TOKEN_SUCCESS,
    payload: access_token,
  }
};

export const loginUser = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_PENDING });

    try {
      const res = await postLogin(email, password);

      if (res?.EC === 0) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res,
        });
      } else {
        dispatch({
          type: LOGIN_ERROR,
          payload: res?.EM || "Login failed",
        });
      }
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.message || "Login error",
      });
    }
  };
};

export const logoutUser = (email) => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT_PENDING });

    try {
      let res = await postLogout(email);
      if (res?.EC === 0 || res?.EC === 1) {
        dispatch({ type: LOGOUT_SUCCESS });
      } else {
        dispatch({
          type: LOGOUT_ERROR,
          payload: res?.EM || "Logout failed",
        });
      }
    } catch (error) {
      dispatch({
        type: LOGOUT_ERROR,
        payload: error.message || "Logout error",
      });
    }
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_USERS_PENDING });

    try {
      let res = await getAllUsers();
      if (res?.EC === 0) {
        dispatch({
          type: FETCH_USERS_SUCCESS,
          payload: res.DT,
        });
      } else if (res?.EC !== 0 && res?.EC !== 4) {
        dispatch({
          type: FETCH_USERS_ERROR,
          payload: res?.EM || "Error fetching users",
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_USERS_ERROR,
        payload: error.message || "Error fetching users",
      });
    }
  };
};