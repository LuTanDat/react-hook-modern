/**
 * component -> axios config -> request -> ...... -> axios config -> response
 * tuong tu nhu middleware
 */


//------------------------------------------------------------------------------

import axios from "axios";
import NProgress from 'nprogress' // loading bars
import { store } from '../redux/store' // get state redux outside component
import { doLogout, refreshToken } from '../redux/action/userAction';


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
  baseURL: "http://localhost:8081/", // URL backend
  withCredentials: true, // QUAN TRỌNG: Gửi cookie refreshToken khi gọi API
  // timeout: 1000, // thoi gian cho server phan hoi ket qua 1000ms
  // headers: {'X-Custom-Header': 'foobar'} // token
});

// Hàm gọi API refresh token
const refreshAccessToken = async () => {
  console.log("Redux state hiện tại:", store.getState());

  const email = store?.getState()?.user?.account?.email;
  try {
    const res = await instance.post("v1/api/refresh-token", { email }); // Gọi API lấy access token mới
    if (res.EC === 0) {
      store.dispatch(refreshToken(res.DT.access_token)); // Cập nhật access token mới vào Redux
      return res.DT.access_token; // Trả về access token mới
    }
  } catch (error) {
    console.error("Lỗi khi refresh token:", error);
    store.dispatch(doLogout()); // Nếu refresh thất bại, đăng xuất người dùng
  }
  return null;
};


// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  NProgress.start();

  const access_token = store?.getState()?.user?.account?.access_token;
  if (access_token) {
    config.headers["Authorization"] = `Bearer ${access_token}`;
  }

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Do something before response is returned
  NProgress.done();
  console.log('>>> check res interceptor success: ', response);

  return response && response.data ? response.data : response;
}, async (error) => {
  // Do something with response error
  NProgress.done();
  console.log('>>> check res interceptor error: ', error);

  if (error.response) {
    const { data, config } = error.response;
    if (data.EC === 4 && !config._retry) { // Nếu lỗi là Access Token hết hạn và chưa thử refresh
      config._retry = true; // Đánh dấu request này đã được thử refresh
      const newAccessToken = await refreshAccessToken(); // Gọi hàm refresh token
      if (newAccessToken) {
        config.headers["Authorization"] = `Bearer ${newAccessToken}`; // Gán access token mới
        return instance(config); // Gửi lại request với token mới
      }
    }
  }

  return error && error.response && error.response.data
    ? error.response.data : Promise.reject(error); // less app death
})

export default instance