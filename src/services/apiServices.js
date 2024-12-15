import axios from "axios";

const postAddNewUsers = async (email, password, username, role, image) => {
  // submit data
  const data = new FormData(); // dung cho du lieu lon nhu file, video
  data.append('email', email);
  data.append('password', password);
  data.append('username', username);
  data.append('role', role);
  data.append('userImage', image);

  return await axios.post('http://localhost:8081/api/v1/participant', data)
}

export {
  postAddNewUsers,

}