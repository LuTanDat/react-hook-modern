import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiServices";

const DetailQuiz = () => {
  const params = useParams();
  const quizId = params.id;

  useEffect(() => {
    fetchDataQuiz();
  }, [quizId])

  const fetchDataQuiz = async () => {
    let res = await getDataQuiz(quizId);
    console.log(res);
  }

  return (
    <div className="detail-quiz-container">
      DetailQuiz of {params.id}
    </div>
  )
}

export default DetailQuiz;