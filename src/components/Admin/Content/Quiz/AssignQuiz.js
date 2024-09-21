import { useEffect, useState } from 'react';
import Select from 'react-select';
import { getAllQuizForAdmin, getAllUsers } from '../../../../services/apiServices';

const AssignQuiz = () => {

  const [listQuiz, setListQuiz] = useState(); // danh sach quiz
  const [selectedQuiz, setSelectedQuiz] = useState({})

  const [listUsers, setListUsers] = useState(); // danh sach User
  const [selectedUser, setSelectedUser] = useState({})

  useEffect(() => {
    fetchListQuiz();
    fetchListUsers();
  }, [])

  const fetchListQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map(item => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`
        }
      })
      setListQuiz(newQuiz)
    }
  }

  const fetchListUsers = async () => {
    let res = await getAllUsers();
    if (res.EC === 0) {
      let newUser = res.DT.map(item => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username} - ${item.email}`
        }
      })
      setListUsers(newUser)
    }
  }

  return (
    <div className="assign-quiz-container row">
      <div className='col-6 form-group'>
        <label className='mb-2'>Select Quiz</label>
        <Select
          defaultValue={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
        />
      </div>
      <div className='col-6 form-group'>
        <label className='mb-2'>Select User</label>
        <Select
          defaultValue={selectedUser}
          onChange={setSelectedUser}
          options={listUsers}
        />
      </div>
      <div>
        <button className="btn btn-warning mt-3">Assign Quiz</button>
      </div>
    </div>
  )
}

export default AssignQuiz;