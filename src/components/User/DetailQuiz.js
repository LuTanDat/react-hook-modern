import './DetailQuiz.scss'
import { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiServices";
import _ from 'lodash';
import Question from './Question';
import ModalResult from './ModalResult';
import RightContent from './Content/RightContent';
import { Breadcrumb } from 'react-bootstrap';

const DetailQuiz = () => {
  const location = useLocation();
  const params = useParams();
  const [dataQuiz, setDataQuiz] = useState([]); // data of 1 quiz
  const [index, setIndex] = useState(0); //currentQuestion
  const [showModalResult, setShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});
  const [isFinished, setIsFinished] = useState(false); // disable text when finished
  const [isShowAnswers, setIsShowAnswers] = useState(false); // show answers when finished

  const quizId = params.id;

  useEffect(() => {
    fetchDataQuiz();
  }, [quizId])

  const fetchDataQuiz = async () => { // che bien du lieu
    let res = await getDataQuiz(quizId);
    //console.log('DataQuiz backend: ', res);

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
            item.answers.isCorrect = false; // add field to check if user selected answer

            answers.push(item.answers)
          })
          answers = _.orderBy(answers, ['id'], ['asc']);

          return { questionId: +key, answers, questionDescription, image }
        })
        .value()

      // console.log('DataQuiz: ', data)
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
    }
  }

  const handleFinishQuiz = async () => { // che bien du lieu truoc khi submit
    // console.log('>>> data before build: ', dataQuiz);
    if (!dataQuiz || dataQuiz.length === 0 || isFinished) return; // can nhac thoat som tranh loi tiem an

    const payload = {
      quizId: +quizId,
      answers: []
    };

    // cach 1: 
    dataQuiz.forEach(question => {
      let userAnswerId = [];
      question.answers.forEach(answer => {
        if (answer.isSelected === true) {
          userAnswerId.push(+answer.id);
        }
      })
      payload.answers.push({
        questionId: +question.questionId,
        userAnswerId: userAnswerId,
      });
    });

    // cach 2:
    // dataQuiz.forEach(question => {
    //   payload.answers.push({
    //     questionId: +question.questionId,
    //     userAnswerId: question.answers.filter(answer => answer.isSelected)
    //       .map(answer => +answer.id)
    //   });
    // });

    // console.log('>>> DataQuiz submit after build: ', payload);


    // SUBMIT API
    let res = await postSubmitQuiz(payload);
    // console.log('>>> res submitted: ', res);
    if (res && res.EC === 0) {
      setIsFinished(true); // submit successfully then disable
      setDataModalResult(res.DT); // throw data result to modal
      setShowModalResult(true);

      // console.log('DataQuiz: ', dataQuiz)
      // console.log('answer correct : ', res.DT.quizData)

      // update DataQuiz with Correct answers
      if (res.DT && res.DT.quizData) {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let a = res.DT.quizData; // answer correct return form DB
        for (let i = 0; i < dataQuizClone.length; i++) {
          for (let j = 0; j < a.length; j++) {
            if (+dataQuizClone[i].questionId === +a[j].questionId) {
              // console.log('dataQuizClone[i]: ', dataQuizClone[i], 'a[j]: ', a[j])

              let arrCorrectId = a[j].systemAnswers.map((answer) => answer.id)

              for (let answerId of arrCorrectId) {
                for (let answer of dataQuizClone[i].answers) {
                  if (+answerId === +answer.id) {
                    answer.isCorrect = true;
                  }
                }
              }

            }
          }
        }
        // console.log('dataQuiz after check answer: ', dataQuizClone);
        setDataQuiz(dataQuizClone);
      }
    } else {
      alert('somethings wrong....')
    }
  };

  return (
    <>
      <Breadcrumb className='quiz-detail-new-header'>
        <NavLink to='/' className='breadcrumb-item'>
          Home
        </NavLink>
        <NavLink to='/users' className='breadcrumb-item'>
          Users
        </NavLink>
        <Breadcrumb.Item active>Làm bài Quiz</Breadcrumb.Item>
      </Breadcrumb>
      <div className="detail-quiz-container">
        <div className="left-content">
          <div className="title">
            Quiz {quizId}: {location?.state?.quizTitle}
            {isFinished &&
              <div className='result'>Kết quả: {dataModalResult.countCorrect} / {dataModalResult.countTotal}</div>
            }

          </div>
          <hr />
          {/* <div className="q-body">
            <img />
          </div> */}
          <div className="q-content">
            <Question
              handleCheckbox={handleCheckbox}
              currentQuestionIndex={index + 1}
              data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
              isFinished={isFinished}
              isShowAnswers={isShowAnswers}
            />
          </div>
          <div className='footer'>
            {index > 0 &&
              <button className='btn btn-secondary'
                onClick={() => handlePrev()}
              >
                Prev
              </button>
            }
            {index + 1 < dataQuiz.length &&
              <button className='btn btn-primary'
                onClick={() => handleNext()}
              >
                Next
              </button>
            }
            <button
              className='btn btn-warning'
              onClick={() => handleFinishQuiz()}
              disabled={isFinished}
            >
              Finish
            </button>
          </div>
        </div>
        <div className="right-content">
          <RightContent
            dataQuiz={dataQuiz}
            handleFinishQuiz={handleFinishQuiz}
            setIndex={setIndex}
          />
        </div>
      </div>
      <ModalResult
        show={showModalResult}
        setShow={setShowModalResult}
        dataModalResult={dataModalResult}
        setIsShowAnswers={setIsShowAnswers}
      />
    </>
  )
}

export default DetailQuiz;