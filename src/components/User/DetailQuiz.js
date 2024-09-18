import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiServices";
import _ from 'lodash';

const DetailQuiz = () => {
  const params = useParams();
  const quizId = params.id;

  useEffect(() => {
    fetchDataQuiz();
  }, [quizId])

  const fetchDataQuiz = async () => {
    let res = await getDataQuiz(quizId);
    console.log('data backend: ', res);
    if (res && res.EC === 0) {
      let raw = res.DT; // du lieu goc return from backend
      let data = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answers = [];
          let questionDescription, image = null;

          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            answers.push(item.answers)
            // console.log('item answers: ', item.answers);
          })
          // console.log('value: ', value, ' key: ', key)

          return { questionId: key, answers, questionDescription, image }
        })
        .value()

      console.log('data: ', data)
    }
  }

  return (
    <div className="detail-quiz-container">
      DetailQuiz of {params.id}
    </div>
  )
}

export default DetailQuiz;