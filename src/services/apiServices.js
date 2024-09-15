import axios from '../utils/axiosCustomize'; // sau nay de thay doi path, cau hinh request, response


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

const getAllUsers = () => {
  return axios.get('api/v1/participant/all')
}

const putUpdateUser = (id, username, role, image) => {
  // submit data
  const data = new FormData(); // dung cho du lieu lon nhu file, video
  data.append('id', id);
  data.append('username', username);
  data.append('role', role);
  data.append('userImage', image);

  return axios.put('api/v1/participant', data)
}

// search: axios delete with url encoded
const deleteUsers = (userId) => {
  return axios.delete('api/v1/participant', { data: { id: userId } })
}

const getUsersWithPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}

export {
  postAddNewUsers, getAllUsers, putUpdateUser, deleteUsers, getUsersWithPaginate
}