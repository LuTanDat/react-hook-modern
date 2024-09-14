import ModalCreateUser from "./ModalCreateUser";
import './ManageUsers.scss'
import { FcPlus } from "react-icons/fc";
import { useState } from "react";

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
        <table className="table-user-container">
          table user
        </table>
      </div>
    </div>
  )
}

export default ManageUsers;