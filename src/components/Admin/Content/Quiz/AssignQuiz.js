import { useEffect, useState } from 'react';
import Select from 'react-select';
import { getAllQuizForAdmin, getAllUsers, postAssignQuiz } from '../../../../services/apiServices';
import { toast } from 'react-toastify';

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
          label: `${item.id} - ${item.name}`
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

  const handleAssign = async () => {
    let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
    // console.log('>>> handleAssign: ', res);
    if (res && res.EC === 0) {
      toast.success(res.EM)
      // Đặt lại trạng thái về rỗng
      setSelectedQuiz({});
      setSelectedUser({});
    } else {
      toast.error(res.EM)
    }
  }

  return (
    <div className="assign-quiz-container row">
      <div className='col-6 form-group'>
        <label className='mb-2'>Select Quiz</label>
        <Select
          value={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
        />
      </div>
      <div className='col-6 form-group'>
        <label className='mb-2'>Select User</label>
        <Select
          value={selectedUser}
          onChange={setSelectedUser}
          options={listUsers}
        />
      </div>
      <div>
        <button
          className="btn btn-warning mt-3"
          onClick={() => handleAssign()}
        >Assign</button>
      </div>
    </div>
  )
}

export default AssignQuiz;