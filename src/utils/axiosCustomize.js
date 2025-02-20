import axios from "axios";
import NProgress from 'nprogress' // loading bars
import { store } from '../redux/store' // get state redux outside component

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


//------------------------------------------------------------------------------

/**
 * component -> axios config -> request -> ...... -> axios config -> response
 * tuong tu nhu middleware
 */

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  const access_token = store?.getState()?.user?.account?.access_token;
  config.headers["Authorization"] = `Bearer ${access_token}`;

  NProgress.start();

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Do something before response is returned
  NProgress.done();
  console.log('>>> check res interceptor: ', response);

  return response && response.data ? response.data : response;
}, function (error) {
  // Do something with response error
  NProgress.done();
  console.log('>>> check res interceptor: ', error);

  return error && error.response && error.response.data
    ? error.response.data : Promise.reject(error); // less app death
})

export default instance