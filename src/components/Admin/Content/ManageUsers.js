import ModalCreateUser from "./ModalCreateUser";
import './ManageUsers.scss'
import { FcPlus } from "react-icons/fc";
import { useState } from "react";
import TableUser from "./TableUser";

const ManageUsers = () => {
  const [show, setShow] = useState(false);

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
          <ModalCreateUser show={show} setShow={setShow} />
        </div>
        <div className="table-user-container">
          <TableUser />
        </div>
      </div>
    </div>
  )
}

export default ManageUsers;