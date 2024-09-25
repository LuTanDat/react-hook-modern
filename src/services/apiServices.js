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

const postLogin = (email, password) => {
  return axios.post(`api/v1/login`, { email, password, delay: 5000 })
}

const postRegister = (email, username, password) => {
  return axios.post(`api/v1/register`, { email, username, password })
}

const getQuizByUser = () => {
  return axios.get('api/v1/quiz-by-participant')
}

const getDataQuiz = (quizId) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${quizId}`)
}

const postSubmitQuiz = (data) => {
  return axios.post(`/api/v1/quiz-submit`, { ...data })
}

const postCreateNewQuiz = (description, name, difficulty, image) => {
  const data = new FormData(); // dung cho du lieu lon nhu file, video
  data.append('description', description);
  data.append('name', name);
  data.append('difficulty', difficulty);
  data.append('quizImage', image);

  return axios.post('api/v1/quiz', data)
}

const getAllQuizForAdmin = () => {
  return axios.get(`api/v1/quiz/all`)
}

const putUpdateQuizForAdmin = (id, name, description, difficulty, image) => {
  const data = new FormData(); // dung cho du lieu lon nhu file, video
  data.append('id', id)
  data.append('description', description);
  data.append('name', name);
  data.append('difficulty', difficulty);
  data.append('quizImage', image);
  return axios.put('api/v1/quiz', data)
}

const deleteQuizForAdmin = (quizId) => {
  return axios.delete(`api/v1/quiz/${quizId}`)
}

const postCreateNewQuestionForAdmin = (quiz_id, description, image) => {
  const data = new FormData();
  data.append('quiz_id', quiz_id);
  data.append('description', description);
  data.append('questionImage', image);
  return axios.post('api/v1/question', data)
}

const postCreateNewAnswerForAdmin = (description, correct_answer, question_id) => {
  return axios.post('api/v1/answer', { description, correct_answer, question_id })
}

const postAssignQuiz = (quizId, userId) => {
  return axios.post('api/v1/quiz-assign-to-user', { quizId, userId })
}

const getQuizWithQA = (quizId) => {
  return axios.get(`api/v1/quiz-with-qa/${quizId}`)
}

const postUpsertQA = (data) => {
  return axios.post('api/v1/quiz-upsert-qa', { ...data })
}

const postLogout = (email, refresh_token) => {
  return axios.post('/api/v1/logout', { email, refresh_token })
}

export {
  postAddNewUsers, getAllUsers, putUpdateUser, deleteUsers, getUsersWithPaginate,
  postLogin, postRegister, postLogout,
  getQuizByUser, getDataQuiz, postSubmitQuiz,
  postCreateNewQuiz, getAllQuizForAdmin, deleteQuizForAdmin, putUpdateQuizForAdmin,
  postCreateNewQuestionForAdmin, postCreateNewAnswerForAdmin,
  postAssignQuiz, getQuizWithQA, postUpsertQA,
}