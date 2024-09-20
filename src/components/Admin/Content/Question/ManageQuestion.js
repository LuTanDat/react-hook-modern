import { useState } from 'react';
import Select from 'react-select';
import './ManageQuestion.scss'
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { RiImageAddFill } from "react-icons/ri";

const ManageQuestion = (props) => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({})

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
        {/* <div className="mt-3">Add Question</div> */}

        <div>
          <div className='mt-3 mb-2'>Add Question</div>
          <div className='question-content'>
            <div className="form-floating description">
              <input type="text" className="form-control" placeholder="Question's Description" />
              <label>Question's Description</label>
            </div>
            <div className='group-upload'>
              <label>
                <RiImageAddFill className='label-up' />
              </label>
              <input type='file' hidden />
              <span>0 file is selected</span>
            </div>
            <div className='btn-add'>
              <span>
                <AiFillPlusSquare className='icon-add' />
              </span>
              <span>
                <AiFillMinusSquare className='icon-remove' />
              </span>
            </div>
          </div>

          <div className='answers-content'>
            <input
              // id={`flexCheckDefault ${index}`}
              className="form-check-input isCorrect"
              type="checkbox"
            // checked={a.isSelected}
            // onChange={(e) => handleHandCheckbox(e, a.id, data.questionId)}
            />
            <div className="form-floating answer-name">
              <input type="text" className="form-control" placeholder="Answer 1" />
              <label>Answer 1</label>
            </div>
            <div className='btn-group'>
              <span>
                <FiPlusCircle className='icon-add' />
              </span>
              <span>
                <FiMinusCircle className='icon-remove' />
              </span>
            </div>
          </div>
        </div>

      </div>
      <div className='list-question'>
        list question
      </div>
    </div>
  )
}

export default ManageQuestion;