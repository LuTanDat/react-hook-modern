import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react'


const TableUserPaginate = (props) => {
  const { listUsers, handleClickBtnUpdate, handleClickBtnDetail, handleClickBtnDelete } = props;

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    props.fetchListUsersWithPaginate(+event.selected + 1);
    props.setCurrentPage(+event.selected + 1); // dong bo state len xuong
    console.log(`User requested page number ${event.selected}`);
  };


  return (
    <>
      <table className="table table-hover table-bordered ">
        <thead>
          <tr>
            <th scope="col">ID</th>
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
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleClickBtnDetail(item)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-warning mx-3"
                    onClick={() => handleClickBtnUpdate(item)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleClickBtnDelete(item)}
                  >
                    Delete
                  </button>
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
      <div className='user-pagination d-flex justify-content-center'>
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={props.pageCount}
          previousLabel="< Prev"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={props.currentPage - 1}
        />
      </div>
    </>
  )
}

export default TableUserPaginate;