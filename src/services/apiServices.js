import axios from '../utils/axiosCustomize'; // sau nay de thay doi path, cau hinh request, response

const postLogin = (email, password) => {
  return axios.post(`api/v1/login`, { email, password, delay: 5000 })
}

const postRegister = (email, username, password) => {
  return axios.post(`api/v1/register`, { email, username, password })
}

const getQuizByUser = () => {
  return axios.get('api/v1/quiz-by-participant')
}

const postAddNewUsers = (email, password, username, role, image) => {
  // submit data
  const data = new FormData(); // dung cho du lieu lon nhu file, video
  data.append('email', email);
  data.append('password', password);
  data.append('username', username);
  data.append('role', role);
  data.append('userImage', image);

  return axios.post('api/v1/participant', data)
}

export {
  postLogin, postRegister, getQuizByUser,
  postAddNewUsers,

}