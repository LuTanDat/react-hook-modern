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
    let res = await getDataQuiz(quizId);// console.log('data backend: ', res);

    if (res && res.EC === 0) {
      let raw = res.DT; // du lieu goc return from backend
      let data = _.chain(raw)
        .groupBy("id")
        .map((value, key) => {
          // console.log('sau che bien: ', 'value: ', value, ' key: ', key)
          let answers = [];
          let questionDescription, image = null;

          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            // console.log('item answers: ', item.answers);// {id:...., description:....}
            item.answers.isSelected = false; // add field to check if user selected answer or not?
            answers.push(item.answers)
          })
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

  // khi quan ly state trong React, nen tao ra ban sao r gán lại de tranh bugs
  const handleCheckbox = (answerId, questionId) => {
    console.log('aId, qId:', answerId, questionId);

    let dataQuizClone = _.cloneDeep(dataQuiz); // clone the dataQuiz

    // find question in dataQuizClone by questionId and update its answer status
    let question = dataQuizClone.find(item => +item.questionId === +questionId);
    if (question && question.answers) {
      // console.log('question checked:', question);
      question.answers = question.answers.map(item => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      })
    }

    // re-find the position of the question in dataQuizClone and update it with the new state
    let index = dataQuizClone.findIndex(item => +item.questionId === +questionId);
    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
      // console.log('question after change: ', question);
      console.log('>>> check dataQuizClone: ', dataQuizClone);
    }
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
            handleCheckbox={handleCheckbox}
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