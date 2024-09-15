import './ManageUsers.scss'
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers, getUsersWithPaginate } from "../../../services/apiServices";
import ModalCreateUser from "./ModalCreateUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDetailUser from "./ModalDetailUser";
import ModalDeleteUser from './ModalDeleteUser';
import TableUserPaginate from './TableUserPaginate';

const ManageUsers = () => {
  const LIMIT_USERS = 6;
  const [pageCount, setPageCount] = useState(0);

  const [show, setShow] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({})

  const [showModelDetail, setShowModelDetail] = useState(false);
  const [dataDetail, setDataDetail] = useState({})

  const [showModelDelete, setShowModelDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({})


  const [listUsers, setListUsers] = useState([])

  useEffect(() => { // không sử dụng async await do nó không chờ
    // fetchListUsers();
    fetchListUsersWithPaginate(1)
  }, [])

  const fetchListUsers = async () => {
    let res = await getAllUsers();
    if (res.EC === 0) {
      setListUsers(res.DT)
    }
  }

  const fetchListUsersWithPaginate = async (page) => {
    let res = await getUsersWithPaginate(page, LIMIT_USERS);
    if (res.EC === 0) {
      // console.log(res.DT)
      setListUsers(res.DT.users)
      setPageCount(res.DT.totalPages)
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
          {/* <TableUser
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnDetail={handleClickBtnDetail}
            handleClickBtnDelete={handleClickBtnDelete}
          /> */}
          <TableUserPaginate
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnDetail={handleClickBtnDetail}
            handleClickBtnDelete={handleClickBtnDelete}
            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
            pageCount={pageCount}
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