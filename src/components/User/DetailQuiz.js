import './DetailQuiz.scss'
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiServices";
import _ from 'lodash';
import Question from './Question';

const DetailQuiz = () => {
  const location = useLocation();
  const params = useParams();
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0); //currentQuestion

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

      // console.log('data: ', data)
      setDataQuiz(data);
    }
  }

  const handlePrev = () => {
    if (dataQuiz && index > 0)
      setIndex(index - 1)
  }

  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1)
      setIndex(index + 1)
  }

  console.log('>>> check dataQuiz: ', dataQuiz);

  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId}: {location?.state?.quizTitle}
        </div>
        <hr />
        <div className="q-body">
          <img />
        </div>
        <div className="q-content">
          <Question
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
          />
        </div>
        <div className='footer'>
          <button className='btn btn-secondary'
            onClick={() => handlePrev()}
          >
            Prev
          </button>
          <button className='btn btn-primary'
            onClick={() => handleNext()}
          >
            Next
          </button>
          <button className='btn btn-warning'
            onClick={() => handleNext()}
          >
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">
        count down
      </div>
    </div>
  )
}

export default DetailQuiz;