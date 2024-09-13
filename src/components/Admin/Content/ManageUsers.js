import ModalCreateUser from "./ModalCreateUser";
import './ManageUsers.scss'

const ManageUsers = () => {
  return (
    <div className="manage-user-container">
      <div className="title">
        Manage Users
      </div>
      <div className="users-content">
        <div>
          <ModalCreateUser />
        </div>
        <table>
          table user
        </table>
      </div>
    </div>
  )
}

export default ManageUsers;