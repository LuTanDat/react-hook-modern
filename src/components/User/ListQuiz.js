import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/apiServices";
// import './ListQuiz.scss'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ListQuiz = (props) => {
  const navigate = useNavigate();
  // const [arrQuiz, setArrQuiz] = useState([]);

  useEffect(() => {
    // getQuizData();
    getAllUser();
  }, [])

  const getAllUser = async () => {
    let res = await getAllUsers();
    if (res?.EC !== 0) {
      toast.error(res?.EM);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  }

  // const getQuizData = async () => {
  //   let res = await getQuizByUser();
  //   // console.log(res);
  //   if (res && res.EC === 0) {
  //     setArrQuiz(res.DT);
  //   }
  // }

  return (
    <div className="list-quiz-container container">
      {/* {arrQuiz && arrQuiz.length > 0 && arrQuiz.map((quiz, index) => {
        return (
          <div key={`Quiz ${index}`} className="card" style={{ width: '18rem' }}>
            <img src={`data:image/jpeg;base64, ${quiz.image}`} className="card-img-top" alt="..." />

            <div className="card-body">
              <h5 className="card-title">Quiz {index + 1}</h5>
              <p className="card-text">{quiz.description}</p>
              <button className="btn btn-primary">Start Now</button>
            </div>
          </div>
        )
      })}
      {arrQuiz && arrQuiz.length === 0 &&
        <div>You don't have any quiz now...</div>
      } */}
    </div>
  )
}

export default ListQuiz;