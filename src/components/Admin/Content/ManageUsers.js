import ModalCreateUser from "./ModalCreateUser";
import './ManageUsers.scss'
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiServices";

const ManageUsers = () => {
  const [show, setShow] = useState(false);

  const [listUsers, setListUsers] = useState([])

  const fetchListUsers = async () => {
    let res = await getAllUsers();
    console.log(res)
    if (res.EC === 0) {
      setListUsers(res.DT)
    }
  }

  useEffect(() => { // không sử dụng async await do nó không chờ
    fetchListUsers();
  }, [])

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
          <TableUser listUsers={listUsers} />
        </div>

        <ModalCreateUser show={show} setShow={setShow} fetchListUsers={fetchListUsers} />
      </div>
    </div>
  )
}

export default ManageUsers;