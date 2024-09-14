import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiServices";

const TableUser = () => {
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
    <>
      <table className="table table-hover table-bordered ">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers && listUsers.length > 0 && listUsers.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <button className="btn btn-secondary">View</button>
                  <button className="btn btn-warning mx-3">Update</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            )
          })}
          {listUsers && listUsers.length === 0 &&
            <tr>
              <td colSpan={'4'} className="text-center">Not found user</td>
            </tr>
          }
        </tbody>
      </table>
    </>
  )
}

export default TableUser;