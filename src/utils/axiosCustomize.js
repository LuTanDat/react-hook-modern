import axios from "axios";
import NProgress from 'nprogress' // loading bars
import { store } from '../redux/store' // get state redux outside component
import axiosRetry from 'axios-retry'; // auto refresh-token
import { postRefreshToken } from "../services/apiServices";

//----------------------------------------------------------------------------------------------

NProgress.configure({
  showSpinner: false,
  // easing: 'ease',
  // speed: 500,
  // trickleRate: 0.5,
  // easing: 'ease',
  // speed: 200,
  // trickle: true,
  // trickleRate: 0.02,
  trickleSpeed: 100,
})

const instance = axios.create({
  baseURL: 'http://localhost:8081/',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'} // token
});

//----------------------------------------------------------------------------------------------

/**
 * component -> axios config -> request api -> axios config -> response
 * tuong tu nhu middleware
 */

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  const access_token = store?.getState()?.user?.account?.access_token;
  if (access_token) {
    config.headers["Authorization"] = `Bearer ${access_token}`;
  }
  NProgress.start();
  return config;                  // Do something before request is sent
}, function (error) {
  return Promise.reject(error);   // Do something with request error
});

// Sử dụng axios-retry để retry khi gặp lỗi liên quan đến token
axiosRetry(instance, {
  retries: 1, // Số lần retry tối đa, ở đây là 1 lần
  retryCondition: (error) => {
    return error.response && error.response.data && error.response.data.EC === -999; // Chỉ retry nếu token hết hạn
  },
  retryDelay: (retryCount) => retryCount * 1000, // Đợi 1 giây trước khi retry
});

// Add a response interceptor
instance.interceptors.response.use(async (response) => {
  // console.log('>>> check res interceptor: ', response);
  NProgress.done();
  return response && response.data ? response.data : response; // custom
}, async (error) => {
  console.log('>>> check res interceptor: ', error);
  NProgress.done();



  const originalRequest = error.config; // Lưu lại cấu hình của request ban đầu
  const { account } = store?.getState()?.user || {}; // Lấy thông tin người dùng từ Redux store
  const { email, refresh_token } = account || {}; // Lấy email và refresh_token từ Redux store

  // Kiểm tra nếu lỗi là do token hết hạn và request chưa retry
  if (error.response && error.response.data.EC === -999 && !originalRequest._retry) {
    originalRequest._retry = true; // Đánh dấu request đã retry để tránh lặp vô hạn

    try {
      // Gọi API refresh token với email và refresh_token
      const res = await postRefreshToken(email, refresh_token);

      // Cập nhật access_token và refresh_token mới vào Redux store
      store.dispatch({
        type: 'REFRESH_TOKEN',
        payload: {
          access_token: res.DT.access_token, // Token mới lấy từ API
          refresh_token: res.DT.refresh_token, // Refresh token mới lấy từ API
        },
      });

      // Gắn access_token mới vào header Authorization của request ban đầu
      originalRequest.headers['Authorization'] = `Bearer ${res.DT.access_token}`;

      // Gửi lại request ban đầu với token mới
      return instance(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError); // Nếu refresh token thất bại, trả về lỗi refreshError
    }
  }



  return error && error.response && error.response.data
    ? error.response.data : Promise.reject(error); // Nếu không phải lỗi do token hết hạn, trả về lỗi gốc
})

export default instance