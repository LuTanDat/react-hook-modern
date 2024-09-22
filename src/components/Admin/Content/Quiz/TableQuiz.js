import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiServices";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";


const TableQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState();

  const [showModel, setShowModel] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({})

  const [showModelDelete, setShowModelDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({})

  useEffect(() => {
    fetchListQuiz();

    props.setIsCreatedNewQuiz(false);
  }, [props.isCreatedNewQuiz === true])

  const fetchListQuiz = async () => {
    setDataUpdate({});
    setDataDelete({});
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      // console.log(res);
      setListQuiz(res.DT)
    }
  }

  const handleClickBtnUpdate = (quiz) => {
    setShowModel(true);
    setDataUpdate(quiz)
  }

  const handleClickBtnDelete = (quiz) => {
    setShowModelDelete(true);
    setDataDelete(quiz);
  }

  return (
    <>
      <div className="title-table-list-quiz">List Quizzes: </div>
      <table className="table table-hover table-bordered mt-2">
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
                  {/* <button
                    className="btn btn-secondary"
                  // onClick={() => handleClickBtnDetail(item)}
                  >
                    View
                  </button> */}
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
        </tbody>
      </table>


      <ModalUpdateQuiz
        show={showModel}
        setShow={setShowModel}
        dataUpdate={dataUpdate}
        fetchQuiz={fetchListQuiz}
        setDataUpdate={setDataUpdate}
      />

      <ModalDeleteQuiz
        show={showModelDelete}
        setShow={setShowModelDelete}
        dataDelete={dataDelete}
        fetchQuiz={fetchListQuiz}
      />
    </>
  )
}

export default TableQuiz;