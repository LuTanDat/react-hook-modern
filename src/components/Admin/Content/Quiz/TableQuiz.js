import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiServices";


const TableQuiz = () => {

  const [listQuiz, setListQuiz] = useState();

  useEffect(() => {
    fetchListQuiz();
  }, [])

  const fetchListQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      console.log(res);
      setListQuiz(res.DT)
    }
  }

  return (
    <>
      <div className="title-table-list-quiz">List Quizzes: </div>
      <table class="table table-hover table-bordered mt-2">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz && listQuiz.length > 0 && listQuiz.map((item, index) => {
            return (
              <tr key={`table-quiz-${index}`}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.difficulty}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                  // onClick={() => handleClickBtnDetail(item)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-warning mx-3"
                  // onClick={() => handleClickBtnUpdate(item)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                  // onClick={() => handleClickBtnDelete(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default TableQuiz;