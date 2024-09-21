import { useEffect, useState } from 'react';
import Select from 'react-select';
import './ManageQuestion.scss'
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid'; // generate unique id
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { getAllQuizForAdmin, postCreateNewQuestionForAdmin, postCreateNewAnswerForAdmin } from '../../../../services/apiServices';

const ManageQuestion = (props) => {

  const [questions, setQuestions] = useState(
    [
      {
        id: uuidv4(),
        description: '',
        imageFile: '',
        imageName: '',
        answers: [
          { id: uuidv4(), description: '', isCorrect: false },
        ]
      }
    ])

  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImagePreview, setDataImagePreview] = useState({
    title: '',
    url: ''
  })

  const [listQuiz, setListQuiz] = useState(); // danh sach quiz
  const [selectedQuiz, setSelectedQuiz] = useState({})

  useEffect(() => {
    fetchListQuiz();
  }, [])

  const fetchListQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map(item => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`
        }
      })
      setListQuiz(newQuiz)
    }
  }

  const handleAddRemoveQuestion = (type, id) => {
    if (type === 'ADD') {
      const newQuestion = {
        id: uuidv4(),
        description: '',
        imageFile: '',
        imageName: '',
        answers: [
          { id: uuidv4(), description: '', isCorrect: false },
        ]
      }
      setQuestions([...questions, newQuestion])
    }
    if (type === 'REMOVE') {
      let questionClone = _.cloneDeep(questions);
      questionClone = questionClone.filter(item => item.id !== id);
      setQuestions(questionClone);
    }
  }

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    if (type === 'ADD') {
      const newQuestion = questions.map((question, index) => {
        if (question.id === questionId) {
          question.answers.push({ id: uuidv4(), description: '', isCorrect: false })
        }
        return question;
      })
      setQuestions(newQuestion);
    }
    if (type === 'REMOVE') {
      // cach 1
      // const newQuestion = questions.map((question, index) => {
      //   if (question.id === questionId) {
      //     question.answers = question.answers.filter(answer => answer.id !== answerId)
      //   }
      //   return question;
      // })
      // setQuestions(newQuestion);

      // cach 2
      let questionClone = _.cloneDeep(questions);
      let index = questionClone.findIndex(item => item.id === questionId);
      questionClone[index].answers = questionClone[index].answers.filter(answer => answer.id !== answerId)
      setQuestions(questionClone);
    }
  }

  const handleOnChange = (type, questionId, value) => {
    if (type === 'QUESTION') {
      let questionClone = _.cloneDeep(questions);
      let index = questionClone.findIndex(item => item.id === questionId);
      if (index > -1) {
        questionClone[index].description = value;
        setQuestions(questionClone);
      }
    }
  }

  const handleOnChangeFileQuestion = (questionId, e) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex(item => item.id === questionId);
    if (index > -1 && e.target && e.target.files && e.target.files[0]) {
      questionClone[index].imageFile = e.target.files[0];
      questionClone[index].imageName = e.target.files[0].name;

      setQuestions(questionClone);
    }
  }

  const handleAnswerQuestion = (type, answerId, questionId, value) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex(item => item.id === questionId);
    if (index > -1) {
      questionClone[index].answers = questionClone[index].answers.map(answer => {
        if (answer.id === answerId) {
          if (type === 'CHECKBOX')
            answer.isCorrect = value;
          if (type === 'INPUT')
            answer.description = value;
        }
        return answer;
      })
      setQuestions(questionClone);
    }
  }

  const handleSubmitQuestionForQuiz = async () => {
    console.log('>>> data after process: ', questions, selectedQuiz);
    // validate


    // submit questions
    // trong map ko chờ, nên phải thêm Promise.all để nó chờ
    await Promise.all(questions.map(async (question) => {
      let q = await postCreateNewQuestionForAdmin(
        +selectedQuiz.value, question.description, question.imageFile)
      console.log('>>> check q: ', q);

      // submit answers
      await Promise.all(question.answers.map(async (answer) => {
        await postCreateNewAnswerForAdmin(
          answer.description, answer.isCorrect, q.DT.id)
      }))
    }))
  }

  const handlePreviewImage = (question) => {
    setIsPreviewImage(true);
    setDataImagePreview({
      title: question.imageName,
      url: URL.createObjectURL(question.imageFile)
    })
  }

  return (
    <div className="question-container">
      <div className="title">
        Manage Question
      </div>
      <hr />
      <div className="add-new-question">
        <div className='col-6 form-group'>
          <label className='mb-2'>Select Quiz</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
          />
        </div>


        <div className='mt-3 mb-2'>Add Question</div>
        {questions && questions.length > 0 && questions.map((question, index) => {
          return (
            <div key={question.id} className='q-main mb-4'>

              <div className='question-content'>
                <div className="form-floating description">
                  <input type="text" className="form-control"
                    placeholder="Question's Description"
                    value={question.description}
                    onChange={(e) => handleOnChange('QUESTION', question.id, e.target.value)}
                  />
                  <label>Question {index + 1}'s Description</label>
                </div>
                <div className='group-upload'>
                  <label htmlFor={`${question.id}`}>
                    <RiImageAddFill className='label-up' />
                  </label>
                  <input id={`${question.id}`} type='file' hidden
                    onChange={(e) => handleOnChangeFileQuestion(question.id, e)}
                  />
                  <span>
                    {question.imageName ?
                      <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => handlePreviewImage(question)}>
                        {question.imageName}
                      </span> :
                      '0 file is selected'}
                  </span>
                </div>
                <div className='btn-add'>
                  <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                    <AiFillPlusSquare className='icon-add' />
                  </span>
                  {
                    questions.length > 1 &&
                    <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                      <AiFillMinusSquare className='icon-remove' />
                    </span>
                  }
                </div>
              </div>

              {question.answers && question.answers.length > 0 && question.answers.map((answer, index) => {
                return (
                  <div key={answer.id} className='answers-content'>
                    <input
                      // id={`flexCheckDefault ${index}`}
                      className="form-check-input isCorrect"
                      type="checkbox"
                      checked={answer.isCorrect}
                      onChange={(e) => handleAnswerQuestion('CHECKBOX', answer.id, question.id, e.target.checked)}
                    />
                    <div className="form-floating answer-name">
                      <input type="text" className="form-control" placeholder="Answer 1"
                        value={answer.description}
                        onChange={(e) => handleAnswerQuestion('INPUT', answer.id, question.id, e.target.value)}
                      />
                      <label>Answer {index + 1}</label>
                    </div>
                    <div className='btn-group'>
                      <span onClick={() => handleAddRemoveAnswer('ADD', question.id, '')}>
                        <FiPlusCircle className='icon-add' />
                      </span>
                      {
                        question.answers && question.answers.length > 1 &&
                        <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
                          <FiMinusCircle className='icon-remove' />
                        </span>
                      }
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
        {questions && questions.length > 0 &&
          <div>
            <button
              onClick={() => handleSubmitQuestionForQuiz()}
              className='btn btn-warning'
            >Save Questions</button>
          </div>
        }

        {isPreviewImage === true &&
          <Lightbox
            image={dataImagePreview.url}
            title={dataImagePreview.title}
            onClose={() => setIsPreviewImage(false)}
          >
          </Lightbox>
        }

      </div>
      <hr />
      <div className='list-question'>
        list question
      </div>
    </div>
  )
}

export default ManageQuestion;