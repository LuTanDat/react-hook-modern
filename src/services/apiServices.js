import axios from '../utils/axiosCustomize'; // sau nay de thay doi path, cau hinh request, response

const postLogin = (email, password) => {
  return axios.post(`v1/api/login`, { email, password, delay: 5000 })
}

const postRegister = (email, username, password) => {
  return axios.post(`v1/api/register`, { email, username, password })
}

const postLogout = () => {
  return axios.post('/v1/api/logout')
}

const getAllUsers = () => {
  return axios.get(`v1/api/get-all-users`);
}

const getQuizByUser = () => {
  return axios.get('v1/api/quiz-by-participant')
}

const postAddNewUsers = (email, password, username, role, image) => {
  // submit data
  const data = new FormData(); // dung cho du lieu lon nhu file, video
  data.append('email', email);
  data.append('password', password);
  data.append('username', username);
  data.append('role', role);
  data.append('userImage', image);

  return axios.post('v1/api/participant', data)
}

export {
  postLogin, postRegister, postLogout,
  getAllUsers,
  getQuizByUser,
  postAddNewUsers,

}