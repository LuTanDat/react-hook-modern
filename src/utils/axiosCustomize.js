import axios from "axios";
import NProgress from 'nprogress' // loading bars
import { store } from '../redux/store'

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


//------------------------------------------------------------------------------

/**
 * component -> axios config -> request 
 * response <- axios config <-
 * tuong tu nhu middleware
 */

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  const access_token = store?.getState()?.user?.account?.access_token;
  config.headers["Authorization"] = `Bearer ${access_token}`;

  NProgress.start();
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  NProgress.done();
  // console.log('>>> check res interceptor: ', response);

  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response && response.data ? response.data : response; // custom
}, function (error) {
  NProgress.done();
  // console.log('>>> check res interceptor: ', error);

  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return error && error.response && error.response.data
    ? error.response.data : Promise.reject(error); // custom
})

export default instance