import ModalCreateUser from "./ModalCreateUser";
import './ManageUsers.scss'
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers, updateAUsers } from "../../../services/apiServices";
import ModalUpdateUser from "./ModalUpdateUser";

const ManageUsers = () => {
  const [show, setShow] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({})

  const [listUsers, setListUsers] = useState([])

  useEffect(() => { // không sử dụng async await do nó không chờ
    fetchListUsers();
  }, [])

  const fetchListUsers = async () => {
    let res = await getAllUsers();
    console.log(res.DT)
    if (res.EC === 0) {
      setListUsers(res.DT)
    }
  }

  const updateAUsers = async (id, username, role, userImage) => {
    let res = await updateAUsers(id, username, role, userImage);
    console.log(res)
    // if (res.EC === 0) {
    //   setListUsers(res.DT)
    // }
  }

  const handleClickBtnUpdate = (user) => {
    setShowModel(true);
    setDataUpdate(user)
    console.log('>>>>  user:', user);

    // fetchAUsers(id)
  }

  const resetUpdateData = () => {
    setDataUpdate({})
  }

  return (
    <div className="manage-user-container">
      <div className="title">
        Manage Users
      </div>
      <div className="users-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => setShow(true)}
          ><FcPlus /> Add new user
          </button>
        </div>
        <div className="table-user-container">
          <TableUser
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
          />
        </div>

        <ModalCreateUser
          show={show}
          setShow={setShow}
          fetchListUsers={fetchListUsers}
        />
        <ModalUpdateUser
          show={showModel}
          setShow={setShowModel}
          dataUpdate={dataUpdate}
          resetUpdateData={resetUpdateData}
          fetchListUsers={fetchListUsers}
        />
      </div>
    </div>
  )
}

export default ManageUsers;