import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:8081/',
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
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Do something before response is returned
  console.log('>>> check res interceptor: ', response);

  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response && response.data ? response.data : response;
}, function (error) {
  console.log('>>> check res interceptor: ', error);

  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return error && error.response && error.response.data
    ? error.response.data : Promise.reject(error); // less app death
})

export default instance