import './ManageUsers.scss'
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiServices";
import ModalCreateUser from "./ModalCreateUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDetailUser from "./ModalDetailUser";
import ModalDeleteUser from './ModalDeleteUser';

const ManageUsers = () => {
  const [show, setShow] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({})

  const [showModelDetail, setShowModelDetail] = useState(false);
  const [dataDetail, setDataDetail] = useState({})

  const [showModelDelete, setShowModelDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({})


  const [listUsers, setListUsers] = useState([])

  useEffect(() => { // không sử dụng async await do nó không chờ
    fetchListUsers();
  }, [])

  const fetchListUsers = async () => {
    let res = await getAllUsers();
    if (res.EC === 0) {
      setListUsers(res.DT)
    }
  }

  const handleClickBtnUpdate = (user) => {
    setShowModel(true);
    setDataUpdate(user)
    console.log('>>>>  user:', user);
  }

  const resetUpdateData = () => {
    setDataUpdate({})
  }

  const handleClickBtnDetail = (user) => {
    setShowModelDetail(true);
    setDataDetail(user)
    console.log('>>>>  user:', user);
  }

  const resetDetailData = () => {
    setDataDetail({})
  }

  const handleClickBtnDelete = (user) => {
    setShowModelDelete(true);
    setDataDelete(user)
    console.log('>>>>  user:', user);
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
            handleClickBtnDetail={handleClickBtnDetail}
            handleClickBtnDelete={handleClickBtnDelete}
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
          resetUpdateData={resetUpdateData} // dong modal tu reset lai data update
          fetchListUsers={fetchListUsers}
        />
        <ModalDetailUser
          show={showModelDetail}
          setShow={setShowModelDetail}
          dataUpdate={dataDetail}
          resetUpdateData={resetDetailData}
        />
        <ModalDeleteUser
          show={showModelDelete}
          setShow={setShowModelDelete}
          dataDelete={dataDelete}
          fetchListUsers={fetchListUsers}
        />
      </div>
    </div>
  )
}

export default ManageUsers;