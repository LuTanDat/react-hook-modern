import { useState } from 'react';
import Select from 'react-select';
import './ManageQuestion.scss'
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid'; // generate unique id
import _ from 'lodash';

const ManageQuestion = (props) => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({})
  const [questions, setQuestions] = useState(
    [
      {
        id: uuidv4(),
        description: 'Question 1',
        imageFile: '',
        imageName: '',
        answers: [
          { id: uuidv4(), description: 'Answer 1', isCorrect: false },
        ]
      }
    ])

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

  console.log('>>> Questions: ', questions);

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
            options={options}
          />
        </div>


        <div className='mt-3 mb-2'>Add Question</div>
        {questions && questions.length > 0 && questions.map((question, index) => {
          return (
            <div key={question.id} className='q-main mb-4'>
              <div className='question-content'>
                <div className="form-floating description">
                  <input type="text" className="form-control" placeholder="Question's Description"
                    value={question.description}
                  />
                  <label>Question {index + 1}'s Description</label>
                </div>
                <div className='group-upload'>
                  <label>
                    <RiImageAddFill className='label-up' />
                  </label>
                  <input type='file' hidden />
                  <span>0 file is selected</span>
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
                    // checked={a.isSelected}
                    // onChange={(e) => handleHandCheckbox(e, a.id, data.questionId)}
                    />
                    <div className="form-floating answer-name">
                      <input type="text" className="form-control" placeholder="Answer 1"
                        value={answer.description}
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

      </div>
      <div className='list-question'>
        list question
      </div>
    </div>
  )
}

export default ManageQuestion;