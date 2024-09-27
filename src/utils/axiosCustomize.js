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
  if (access_token) {
    config.headers["Authorization"] = `Bearer ${access_token}`;
  }
  NProgress.start();
  return config;                  // Do something before request is sent
}, function (error) {
  return Promise.reject(error);   // Do something with request error
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // console.log('>>> check res interceptor: ', response);
  NProgress.done();

  // Any status code that lie within the range of 2xx cause this function to trigger. Do something with response data
  return response && response.data ? response.data : response; // custom
}, function (error) {
  // console.log('>>> check res interceptor: ', error);
  NProgress.done();

  // token expired
  if (error.response.data && error.response.data.EC === -999) {
    window.location.href = '/login';
  }

  return error && error.response && error.response.data
    ? error.response.data : Promise.reject(error); // custom
})

export default instance